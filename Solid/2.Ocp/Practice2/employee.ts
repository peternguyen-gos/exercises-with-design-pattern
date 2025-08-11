import { EmployeeType } from './employee-type.enum';

export abstract class Employee {
    constructor(public name: string, public type: EmployeeType) { }

    abstract calculateSalary(): number
}