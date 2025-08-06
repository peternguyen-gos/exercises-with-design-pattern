export interface NewMachine {
    print(document: string): void;
    scan(document: string): void;
    fax(document: string): void;
}