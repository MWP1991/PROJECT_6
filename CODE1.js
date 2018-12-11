/**
 *   @author Page, Marshall (mpage@student.ncmich.edu)
 *   @version 0.0.1
 *   @summary Project 6 || created: 12.10.2018
 *   @todo
 */

'use strict';

const PROMPT = require('readline-sync');

const SERVICES = ['Haircut', 'Manicure', 'Pedicure', 'Coloring'];
const PRICE = [
    {min: 50, max: 50, name: 'Coloring'},
    {min: 75, max: 75, name: 'Manicure'},
    {min: 65, max: 65, name: 'Pedicure'},
    {min: 100, max: 100, name: 'Haircut'}
];
const MENU = [
    {text: '0. Transactions', action: makePurchase},
    {text: '1. Receipt', action: receipt},
    {text: '2. Exit', action: exit}
];

let sales;
let employeeName;
let identificationNumber;
let services;
let Exit = false;
let counter;

/**
 * main
 */
function main() {
    setPin();
    setEmployeeName();
    setCounter();
    setSales();
    setServices();

    while(!Exit) {
        showMainMenu();
        setServiceTotals();
    }
}

/**
 * Starting page
 */
function showMainMenu() {
    console.log('Please select a command: ');
    for(let i = 0; i < MENU.length; i++) {
        console.log(`\t${MENU[i].text}`);
    }
    let menuSelection = PROMPT.questionInt('--> ');
    if(menuSelection >= 0 && menuSelection < MENU.length) {
        MENU[menuSelection].action();
    }
}
/**
 * @method
 * @desc customerName mutator
 * @returns {null}
 */
function setEmployeeName() {
    employeeName = PROMPT.question(`\nPlease enter your name: `);
}

/**
 * @method
 * @desc customerPin mutator
 * @returns {null}
 */
function setPin() {
    const PIN_NUMBER = 2525;
    identificationNumber = Number(PROMPT.question('\nPlease enter your employee ID number: (teacher hint:2525) '));
    if (identificationNumber !== PIN_NUMBER) {
        console.log(`I'm Sorry, the ID number you have entered is incorrect. Please try again.`);
        return setPin();
    }
}


/**
 * services
 */
function setServices() {
    services = new Array(SERVICES.length);
    for(let i = 0; i < SERVICES.length; i++) {
        services[i] = { id: i, service: SERVICES[i], numOfTransactions: 0, totalSales: 0 };
    }
}

/**
 * sales
 */
function setSales() {
    sales = [];
}

/**
 * finds the price and service
 */
function makePurchase() {
    let price = findPrice();
    let service = findService();

    sales.push({ price, service });
}

/**
 * receipt.
 */
function showReceipt(serviceList) {
    for(let i = 0; i < serviceList.length; i++) {
        console.log(`----- ${serviceList[i].service} by ${employeeName} -----`);
        for(let x = 0; x < PRICE.length; x++) {
            let currPrice = PRICE[x];
            let filteredTransactions = filterTransactions(x, serviceList[i].id);
            console.log(`${currPrice.name}:\t${filteredTransactions.length}`);
        }
        console.log('\n');
    }
}

/**
 * Show a report
 */
function receipt() {
    showReceipt(services);
}


/**
 *
 */
function filterTransactions(price, service) {
    let result = sales.filter((el) => {
        return el.price >= PRICE[price].min && el.price <= PRICE[price].max && el.service === service;
    });
    return result;
}

/**
 * Ask how much
 *
 */
function findPrice() {
    let price = PROMPT.questionFloat('Please enter transaction amount: (Haircut = $100) (Manicure = $75) (Pedicure = $65) (Coloring = $50) -->');

    if(price >= 0) {
        return price;
    } else {
        console.log('Price must be positive!');
        return findPrice();
    }
}

/**
 * Service
 */
function findService() {
    console.log('Types of services: ');
    for(let i = 0; i < services.length; i++) {
        console.log(`${i}. ${services[i].service}`);
    }

    let service = PROMPT.questionInt('Please select service performed: ');

    if(service >= 0 && service < services.length) {
        return service;
    } else {
        console.log('Please select a service.');
        return findService();
    }
}

function setCounter() {
    if (counter != null) {
        counter++;
    } else {
        counter = 1;
    }
}

/**
 * total sales and number of sales
 */
function setServiceTotals() {
    for(let i = 0; i < sales.length; i++) {
        services[sales[i].service].totalSales += sales[i].price;
        services[sales[i].service].numOfTransactions += 1;
    }
}

/**
 * Exit program with true or false question
 */
function exit() {
    Exit = true;
}

main()

/*
The Curl Up and Dye Beauty Salon maintains a master file that contains a record for each of its clients. Fields in the master file include the client's ID number, first name, last name, and total amount spent this year.
Every week, a transaction file is produced. It contains a customer's ID number, the service received (for example, Manicure), and the price paid. Each file is sorted in ID number order.
Write a program that matches the master and transaction file records and updates the total paid for each client by adding the current week's price paid to the cumulative total.
Not all clients purchase services each week. The output is the updated master file and an error report that lists any transaction records for which no master record exists. Output a coupon for a free haircut each time a client exceeds $750 in services.
The coupon, which contains the client's name and an appropriate congratulatory message, is output during the execution of the update program when a client total surpasses $750.
*/