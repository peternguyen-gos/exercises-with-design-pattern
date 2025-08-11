import { NewMachine } from "../new-machine";

export class NewFashionedPrinter implements NewMachine {
    print(document: string): void {
        console.log(`Printing document: ${document}`);
    }

    scan(document: string): void {
        console.log(`Scanning document: ${document}`);
    }

    fax(document: string): void {
        console.log(`Faxing document: ${document}`);
    }
}