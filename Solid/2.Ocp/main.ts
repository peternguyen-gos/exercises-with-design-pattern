/**
 * *****************************************
 * 📝 UNCOMMENT THE PRACTICE SECTION CODE YOU WANT BELOW AND START YOUR SOLUTION
 * *****************************************
 *
 * The following lines are currently commented out.
 * Uncomment them to start implementing your solution.
 * Happy coding! 🚀
 */

/*=========== START PRACTICE 1 ===============*/

import { Shape } from './Practice1/shape';
import { ShapeStore } from './Practice1/shape.store';
import { Circle } from './Practice1/iml/circle';
import { Rectangle } from './Practice1/iml/recangle';
import { Triangle } from './Practice1/iml/triangle';

let shapes: Shape[] = [
    new Circle(5),
    new Rectangle(4, 5),
    new Triangle(3)
];
let shapesInstance = new ShapeStore(shapes);
console.log(shapesInstance.calculateArea());
/*=========== END PRACTICE 1 ===============*/



/*=========== START PRACTICE 2 ===============*/
import { EmployeeType } from './Practice2/employee-type.enum';
import { FullTimeEmployee } from './Practice2/iml/fulltime.employee';
import { PartTimeEmployee } from './Practice2/iml/parttime.employee';
import { InternEmployee } from './Practice2/iml/intern.employee';



const fullTimeEmployee = new FullTimeEmployee("Alice", EmployeeType.FullTime);
console.log(`${fullTimeEmployee.name}'s salary is ${fullTimeEmployee.calculateSalary()}`);

const internEmployee = new InternEmployee("Bob", EmployeeType.Intern);
console.log(`${internEmployee.name}'s salary is ${internEmployee.calculateSalary()}`);
/*=========== END PRACTICE 2 ===============*/
