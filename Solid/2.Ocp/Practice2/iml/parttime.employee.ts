import { Employee } from '../employee';
export class PartTimeEmployee extends Employee {
    calculateSalary(): number {
        return 3000;
    }
}