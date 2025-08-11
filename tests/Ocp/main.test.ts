import { Shape } from '../../Solid/2.Ocp/Practice1/shape';
import { ShapeStore } from '../../Solid/2.Ocp/Practice1/shape.store';
import { Circle } from '../../Solid/2.Ocp/Practice1/iml/circle';
import { Rectangle } from '../../Solid/2.Ocp/Practice1/iml/recangle';
import { Triangle } from '../../Solid/2.Ocp/Practice1/iml/triangle';
import { EmployeeType } from '../../Solid/2.Ocp/Practice2/employee-type.enum';
import { Employee } from '../../Solid/2.Ocp/Practice2/employee';
import { FullTimeEmployee } from '../../Solid/2.Ocp/Practice2/iml/fulltime.employee';
import { PartTimeEmployee } from '../../Solid/2.Ocp/Practice2/iml/parttime.employee';
import { InternEmployee } from '../../Solid/2.Ocp/Practice2/iml/intern.employee';

describe('OCP - Practice 1: Shape Store', () => {
    describe('Circle', () => {
        it('should calculate area correctly', () => {
            const circle = new Circle(5);
            expect(circle.radius).toBe(5);
            expect(circle.getArea()).toBeCloseTo(Math.PI * 25, 5);
        });

        it('should handle zero radius', () => {
            const circle = new Circle(0);
            expect(circle.getArea()).toBe(0);
        });

        it('should handle decimal radius', () => {
            const circle = new Circle(3.5);
            expect(circle.getArea()).toBeCloseTo(Math.PI * 12.25, 5);
        });
    });

    describe('Rectangle', () => {
        it('should calculate area correctly', () => {
            const rectangle = new Rectangle(4, 5);
            expect(rectangle.height).toBe(4);
            expect(rectangle.width).toBe(5);
            expect(rectangle.getArea()).toBe(20);
        });

        it('should handle zero dimensions', () => {
            const rectangle = new Rectangle(0, 5);
            expect(rectangle.getArea()).toBe(0);
        });

        it('should handle decimal dimensions', () => {
            const rectangle = new Rectangle(2.5, 3.2);
            expect(rectangle.getArea()).toBe(8);
        });

        it('should handle square (equal height and width)', () => {
            const rectangle = new Rectangle(3, 3);
            expect(rectangle.getArea()).toBe(9);
        });
    });

    describe('Triangle', () => {
        it('should calculate equilateral triangle area correctly', () => {
            const triangle = new Triangle(3);
            expect(triangle.length).toBe(3);
            const expectedArea = 3 * 3 * Math.sqrt(3) / 4;
            expect(triangle.getArea()).toBeCloseTo(expectedArea, 5);
        });

        it('should handle zero length', () => {
            const triangle = new Triangle(0);
            expect(triangle.getArea()).toBe(0);
        });

        it('should handle decimal length', () => {
            const triangle = new Triangle(4.5);
            const expectedArea = 4.5 * 4.5 * Math.sqrt(3) / 4;
            expect(triangle.getArea()).toBeCloseTo(expectedArea, 5);
        });
    });

    describe('ShapeStore', () => {
        it('should calculate total area of all shapes', () => {
            const shapes: Shape[] = [
                new Circle(5),
                new Rectangle(4, 5),
                new Triangle(3)
            ];
            const shapeStore = new ShapeStore(shapes);
            
            const expectedTotal = Math.PI * 25 + 20 + (3 * 3 * Math.sqrt(3) / 4);
            expect(shapeStore.calculateArea()).toBeCloseTo(expectedTotal, 5);
        });

        it('should handle empty shapes array', () => {
            const shapeStore = new ShapeStore([]);
            expect(shapeStore.calculateArea()).toBe(0);
        });

        it('should handle single shape', () => {
            const shapes: Shape[] = [new Circle(2)];
            const shapeStore = new ShapeStore(shapes);
            expect(shapeStore.calculateArea()).toBeCloseTo(Math.PI * 4, 5);
        });

        it('should have correct shapes property', () => {
            const shapes: Shape[] = [new Circle(1), new Rectangle(2, 3)];
            const shapeStore = new ShapeStore(shapes);
            expect(shapeStore.shapes).toBe(shapes);
            expect(shapeStore.shapes.length).toBe(2);
        });

        it('should handle mixed shape types', () => {
            const shapes: Shape[] = [
                new Circle(1),
                new Rectangle(2, 3),
                new Triangle(2),
                new Circle(3),
                new Rectangle(1, 1)
            ];
            const shapeStore = new ShapeStore(shapes);
            
            const expectedTotal = 
                Math.PI * 1 + // Circle(1)
                6 + // Rectangle(2,3)
                (2 * 2 * Math.sqrt(3) / 4) + // Triangle(2)
                Math.PI * 9 + // Circle(3)
                1; // Rectangle(1,1)
            
            expect(shapeStore.calculateArea()).toBeCloseTo(expectedTotal, 5);
        });
    });
});

describe('OCP - Practice 2: Employee System', () => {
    describe('EmployeeType Enum', () => {
        it('should have correct enum values', () => {
            expect(EmployeeType.FullTime).toBe(0);
            expect(EmployeeType.PartTime).toBe(1);
            expect(EmployeeType.Intern).toBe(2);
        });
    });

    describe('FullTimeEmployee', () => {
        it('should create full-time employee with correct properties', () => {
            const employee = new FullTimeEmployee("Alice", EmployeeType.FullTime);
            expect(employee.name).toBe("Alice");
            expect(employee.type).toBe(EmployeeType.FullTime);
        });

        it('should calculate correct salary', () => {
            const employee = new FullTimeEmployee("Alice", EmployeeType.FullTime);
            expect(employee.calculateSalary()).toBe(5000);
        });

        it('should inherit from Employee', () => {
            const employee = new FullTimeEmployee("Alice", EmployeeType.FullTime);
            expect(employee).toBeInstanceOf(Employee);
        });
    });

    describe('PartTimeEmployee', () => {
        it('should create part-time employee with correct properties', () => {
            const employee = new PartTimeEmployee("Bob", EmployeeType.PartTime);
            expect(employee.name).toBe("Bob");
            expect(employee.type).toBe(EmployeeType.PartTime);
        });

        it('should calculate correct salary', () => {
            const employee = new PartTimeEmployee("Bob", EmployeeType.PartTime);
            expect(employee.calculateSalary()).toBe(3000);
        });

        it('should inherit from Employee', () => {
            const employee = new PartTimeEmployee("Bob", EmployeeType.PartTime);
            expect(employee).toBeInstanceOf(Employee);
        });
    });

    describe('InternEmployee', () => {
        it('should create intern employee with correct properties', () => {
            const employee = new InternEmployee("Charlie", EmployeeType.Intern);
            expect(employee.name).toBe("Charlie");
            expect(employee.type).toBe(EmployeeType.Intern);
        });

        it('should calculate correct salary', () => {
            const employee = new InternEmployee("Charlie", EmployeeType.Intern);
            expect(employee.calculateSalary()).toBe(1000);
        });

        it('should inherit from Employee', () => {
            const employee = new InternEmployee("Charlie", EmployeeType.Intern);
            expect(employee).toBeInstanceOf(Employee);
        });
    });

    describe('Employee polymorphism', () => {
        it('should work with polymorphic behavior', () => {
            const employees: Employee[] = [
                new FullTimeEmployee("Alice", EmployeeType.FullTime),
                new PartTimeEmployee("Bob", EmployeeType.PartTime),
                new InternEmployee("Charlie", EmployeeType.Intern)
            ];

            const salaries = employees.map(emp => emp.calculateSalary());
            expect(salaries).toEqual([5000, 3000, 1000]);
        });

        it('should maintain correct types and names', () => {
            const employees: Employee[] = [
                new FullTimeEmployee("Alice", EmployeeType.FullTime),
                new PartTimeEmployee("Bob", EmployeeType.PartTime),
                new InternEmployee("Charlie", EmployeeType.Intern)
            ];

            expect(employees[0].name).toBe("Alice");
            expect(employees[0].type).toBe(EmployeeType.FullTime);
            expect(employees[1].name).toBe("Bob");
            expect(employees[1].type).toBe(EmployeeType.PartTime);
            expect(employees[2].name).toBe("Charlie");
            expect(employees[2].type).toBe(EmployeeType.Intern);
        });
    });

    describe('Edge cases', () => {
        it('should handle empty string names', () => {
            const employee = new FullTimeEmployee("", EmployeeType.FullTime);
            expect(employee.name).toBe("");
            expect(employee.calculateSalary()).toBe(5000);
        });

        it('should handle special characters in names', () => {
            const employee = new InternEmployee("José María", EmployeeType.Intern);
            expect(employee.name).toBe("José María");
            expect(employee.calculateSalary()).toBe(1000);
        });

        it('should handle long names', () => {
            const longName = "VeryVeryVeryLongEmployeeName";
            const employee = new PartTimeEmployee(longName, EmployeeType.PartTime);
            expect(employee.name).toBe(longName);
            expect(employee.calculateSalary()).toBe(3000);
        });
    });
});