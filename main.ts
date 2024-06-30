import inquirer from "inquirer";

// bank account interface

interface BankAccount{
    accountnumber: number;
    balance:number;
    withdraw(amount:number): void
    deposit(amount:number): void
    checkbalance(): void
}
//bank amount class

class BankAccount implements BankAccount{
    accountnumber:number;
    balance:number;

    constructor(accoutnumber: number, balance: number){
        this.accountnumber= accoutnumber;
        this.balance= balance
    }

    //debit money

    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount;
            console.log(`Withfrawl of $${amount} successful. Rimaning balance ${this.balance}`);
        }else{
            console.log("Insufficent Balance")
        }
    }

    //credit money

    deposit(amount: number): void {
        if(amount > 100){
            amount -= 1;
        }this.balance += amount;
        console.log(`Deposit of $${amount} successful. Rimaning balance ${this.balance} `);
        
    }

    //check balance

    checkbalance(): void {
        console.log(`Current balance $${this.balance}`);
    }
}

// customer class

class Customer{
    firstname: string;
    lastname: string;
    gender: string;
    age: number;
    mobilenumber: number;
    account: BankAccount

    constructor(firstname: string, lastname: string, gender: string, age: number, mobilenumber: number, account: BankAccount )
    {
        this.firstname = firstname
        this.lastname = lastname
        this.gender = gender
        this.age = age
        this.mobilenumber =mobilenumber
        this.account =account
    }
}
// creat bank account

const accounts : BankAccount[] = [
     new BankAccount (1001, 500),
     new BankAccount (1002, 1000),
     new BankAccount (1003, 2000)
];

// Creat customers

const customers: Customer[] = [
    new Customer ("Hamze","khan","male",30, 36859979979, accounts[0]),
    new Customer ("hammad","Rajput","male",60, 31849058966, accounts[1]),
    new Customer ("fiza","Rajput","female",20, 31248488998, accounts[2]),
]

//Function to interact with bank account

 async function service(){
    do{
        const accountnumberInput  = await inquirer.prompt({
            name: "accountnumber",
            type:"number",
            message:"Enter your account number:"
        })

         const customer = customers.find(cust => cust.account.accountnumber === accountnumberInput.accountnumber)
        if(customer){
            console.log(`Welcome, ${customer.firstname} ${customer.lastname}!\n`);
            const ans = await inquirer.prompt([{
                name:"select",
                type:"list",
                message:"select an option",
                choices: ["deposit","Withdraw","check balance","exit"]
            }])

            switch (ans.select) {
                 case "deposit":
                    const depositAmount = await inquirer.prompt({
                        name:"amount",
                        type:"number",
                        message:"Enter the amount to deposit",

                    })
                    customer.account.deposit(depositAmount.amount)
                    break;
                    case "Withdraw":
                        const WithdrawAmount = await inquirer.prompt({
                            name:"amount",
                            type:"number",
                            message:"Enter the amount to deposit",
    
                        })
                        customer.account.deposit(WithdrawAmount.amount)
                        break;

                        case" check balance":
                        customer.account.checkbalance();
                        break;

                        case "exit":
                        console.log("Exiting bank program");
                        console.log("Thank you for using our service");
                        return;

            }
        } else{
            console.log("Invailid amount number");
            
        }
    } while(true)
}

service()






























