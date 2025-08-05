import { Employee } from '../employee';
export class InternEmployee extends Employee {
    calculateSalary(): number {
        return 1000;
    }
}