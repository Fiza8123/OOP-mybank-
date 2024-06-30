import inquirer from "inquirer";
//bank amount class
class BankAccount {
    accountnumber;
    balance;
    constructor(accoutnumber, balance) {
        this.accountnumber = accoutnumber;
        this.balance = balance;
    }
    //debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withfrawl of $${amount} successful. Rimaning balance ${this.balance}`);
        }
        else {
            console.log("Insufficent Balance");
        }
    }
    //credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. Rimaning balance ${this.balance} `);
    }
    //check balance
    checkbalance() {
        console.log(`Current balance $${this.balance}`);
    }
}
// customer class
class Customer {
    firstname;
    lastname;
    gender;
    age;
    mobilenumber;
    account;
    constructor(firstname, lastname, gender, age, mobilenumber, account) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.age = age;
        this.mobilenumber = mobilenumber;
        this.account = account;
    }
}
// creat bank account
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];
// Creat customers
const customers = [
    new Customer("Hamze", "khan", "male", 30, 36859979979, accounts[0]),
    new Customer("hammad", "Rajput", "male", 60, 31849058966, accounts[1]),
    new Customer("fiza", "Rajput", "female", 20, 31248488998, accounts[2]),
];
//Function to interact with bank account
async function service() {
    do {
        const accountnumberInput = await inquirer.prompt({
            name: "accountnumber",
            type: "number",
            message: "Enter your account number:"
        });
        const customer = customers.find(customers => customer.accountnumber === accountnumberInput.accountnumber);
        if (customer) {
            console.log(`Welcome, ${customer.firstname} ${customer.lastname}!\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "select an option",
                    choices: ["deposit", "Withdraw", "check balance", "exit"]
                }]);
            switch (ans.select) {
                case "deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit",
                    });
                    customer.amount.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const WithdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit",
                    });
                    customer.amount.deposit(WithdrawAmount.amount);
                    break;
                case " check balance":
                    customer.account.checkbalance();
                    break;
                case "exit":
                    console.log("Exiting bank program");
                    console.log("Thank you for using our service");
                    return;
            }
        }
        else {
            console.log("Invailid amount number");
        }
    } while (true);
}
service();
