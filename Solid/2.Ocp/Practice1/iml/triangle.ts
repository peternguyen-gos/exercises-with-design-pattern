import { Shape } from '../shape';
export class Triangle extends Shape {
    length: number
    constructor(length: number) {
        super();
        this.length = length;
    }

    getArea(): number {
        return this.length * this.length * Math.sqrt(3) / 4;
    }
}