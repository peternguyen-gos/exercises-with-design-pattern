import { Employee } from '../employee';

export class FullTimeEmployee extends Employee {
    calculateSalary(): number {
        return 5000;
    }
}