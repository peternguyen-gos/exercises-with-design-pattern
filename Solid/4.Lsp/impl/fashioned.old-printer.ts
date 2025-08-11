import { OldMachine } from "../old-machine";

export class OldFashionedPrinter implements OldMachine {
    print(document: string): void {
        console.log(`Printing document: ${document}`);
    }
}