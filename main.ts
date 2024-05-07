#!/usr/bin/env node

import readline from 'readline';
import chalk from 'chalk';

// Print welcome message
console.log(chalk.bold.rgb(73, 158, 255)(`${chalk.bold.hex('#499EFF')(`\n  \t\t <<<======================================>>>`)}`));
console.log(chalk.rgb(0, 255, 51).bold("\n \t<================ Welcome To My BlockTech Institute! ================>\n"));
console.log(chalk.bold.rgb(73, 158, 255)(`${chalk.bold.hex('#499EFF')(`\t\t <<<======================================>>>\n`)}`));

class Student {
    name: string;
    id: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.name = name;
        this.id = this.generateId();
        this.courses = [];
        this.balance = 1000;
    }

    generateId(): string {
        // Generate a random 5-digit ID number
        const randomId = Math.floor(10000 + Math.random() * 99999).toString();
        return randomId;
    }

    enroll(course: string) {
        // Check if the course is one of the limited courses
        const limitedCourses = [
            "Certified cloud applied Generative AI Engineering",
            "Metaverse",
            "Web 3.0",
            "Blockchain",
            "Graphic Designing",
            "Programming"
        ];

        if (limitedCourses.includes(course)) {
            this.courses.push(course);
            console.log(chalk.green.bold((`Congratulations! You've officially been enrolled in the ${course} Course!`)));
        }
         else {
            console.log(chalk.red.bold((`Sorry, ${course} this course is not available.`)));
        }
    }

    viewBalance() {
        console.log(chalk.green.bold(`\n\n\n\t\t\tBalance for ${this.name}: $${this.balance}\n`));
    }

    payTuition() {
        const tuitionFee = 200;
        if (this.balance >= tuitionFee) {
            this.balance -= tuitionFee;
            console.log(chalk.green.bold((`Paid tuition fee: $${tuitionFee}`)));
        } else {
            console.log(chalk.red.bold((`Insufficient balance to pay tuition fee.`)));
        }
    }

    getStatus() {
        return chalk.cyan.bold(`\nName: ${this.name},\n ID: ${this.id},\n Courses Enrolled: ${this.courses.join(", ")},\n Balance: $${this.balance}`);
    }
}

function prompt(question: string): Promise<string> {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(chalk.rgb(0, 255, 255).bold(question), (answer) => {
            resolve(answer);
            rl.close();
        });
    });
}

async function enrollCourse(student: Student) {
    console.log(chalk.rgb(0, 255, 26).bold(("\n\n\n\t\t\tAvailable courses:")));
    console.log(chalk.rgb(255, 239, 0).bold(("\t\t\t- Certified cloud applied Generative AI Engineering")));
    console.log(chalk.rgb(255, 239, 0).bold(("\t\t\t- Metaverse")));
    console.log(chalk.rgb(255, 239, 0).bold(("\t\t\t- Web 3.0")));
    console.log(chalk.rgb(255, 239, 0).bold(("\t\t\t- Blockchain")));
    console.log(chalk.rgb(255, 239, 0).bold(("\t\t\t- Graphic Designing")));
    console.log(chalk.rgb(255, 239, 0).bold(("\t\t\t- Programming")));

    const course = await prompt("\n\n\n\t\t\tEnter course name to enroll: ");
    student.enroll(course);
}

async function payTuition(student: Student) {
    student.payTuition();
}

function showStatus(student: Student) {
    console.log(chalk.magenta.bold(student.getStatus()));
}

async function main() {
    const name = await prompt(chalk.rgb(0, 255, 255).bold("\n\n\n\t\t\tEnter student's name: "));
    const student = new Student(name);

    console.log(chalk.cyan.bold(`\n\t\t\tWelcome, ${student.name}! Your ID : ${student.id}`));

    let operation = '';
    while (operation !== 'exit') {
        operation = await prompt(chalk.rgb(0, 255, 255).bold(("\n\n\n\t\t\tEnter operation (enroll, view balance, pay tuition fees, show status, exit): ")));
        if (operation === 'enroll') {
            await enrollCourse(student);
        }
         else if (operation === 'view balance') {
            student.viewBalance();
        }
        else if (operation === 'pay tuition fees') {
            await payTuition(student);
        }
         else if (operation === 'show status') {
            showStatus(student);
        }
         else if (operation === 'exit') {
            console.log(chalk.rgb(0, 255, 255).bold("\n\n\n\t\t\tExiting Student Management System."));
        }
         else {
            console.log(chalk.red.bold("\n\n\n\t\t\tInvalid operation. Please try again."));
        }
    }
}

main();