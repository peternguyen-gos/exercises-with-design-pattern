import { Shape } from './shape';
export class ShapeStore {
    shapes: Shape[];
    constructor(shapes: Shape[]) {
        this.shapes = shapes;
    }

    calculateArea(): number {
        let total = 0;
        this.shapes.forEach((shape) => {
            total += shape.getArea();
        });
        return total;
    }
}