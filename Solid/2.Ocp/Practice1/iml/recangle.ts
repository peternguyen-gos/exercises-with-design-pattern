import { Shape } from '../shape';
export class Rectangle extends Shape {
    height: number
    width: number
    constructor(height: number, width: number) {
        super();
        this.height = height;
        this.width = width;
    }

    getArea(): number {
        return this.height * this.width;
    }
}

