import { Shape } from '../shape';
export class Circle extends Shape {
    radius: number;
    constructor(radius: number) {
        super();
        this.radius = radius;
    }

    getArea(): number {
        return Math.PI * Math.pow(this.radius, 2);
    }
}