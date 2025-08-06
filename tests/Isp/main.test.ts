import { OldMachine } from '../../Solid/4.Lsp/old-machine';
import { NewMachine } from '../../Solid/4.Lsp/new-machine';
import { OldFashionedPrinter } from '../../Solid/4.Lsp/impl/fashioned.old-printer';
import { NewFashionedPrinter } from '../../Solid/4.Lsp/impl/fashioned.new-printer';

// Mock console.log to capture output
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('ISP - Interface Segregation Principle', () => {
    beforeEach(() => {
        mockConsoleLog.mockClear();
    });

    afterAll(() => {
        mockConsoleLog.mockRestore();
    });

    describe('OldMachine Interface', () => {
        test('should define print method only', () => {
            // Since TypeScript interfaces don't exist at runtime, we test through implementation
            const printer = new OldFashionedPrinter();
            
            // Should have print method
            expect(printer.print).toBeDefined();
            expect(typeof printer.print).toBe('function');
            
            // Should not have scan or fax methods (ISP compliance)
            expect((printer as any).scan).toBeUndefined();
            expect((printer as any).fax).toBeUndefined();
        });

        test('should allow implementations that only need printing functionality', () => {
            const printer: OldMachine = new OldFashionedPrinter();
            
            // This demonstrates ISP - clients only depend on methods they need
            expect(() => printer.print('test document')).not.toThrow();
            expect(mockConsoleLog).toHaveBeenCalledWith('Printing document: test document');
        });
    });

    describe('NewMachine Interface', () => {
        test('should define all three methods: print, scan, fax', () => {
            const printer = new NewFashionedPrinter();
            
            // Should have all methods
            expect(printer.print).toBeDefined();
            expect(printer.scan).toBeDefined();
            expect(printer.fax).toBeDefined();
            
            expect(typeof printer.print).toBe('function');
            expect(typeof printer.scan).toBe('function');
            expect(typeof printer.fax).toBe('function');
        });

        test('should allow implementations that need full functionality', () => {
            const multiFunction: NewMachine = new NewFashionedPrinter();
            
            // This demonstrates ISP - clients can depend on complete interface when needed
            expect(() => {
                multiFunction.print('test document');
                multiFunction.scan('test document');
                multiFunction.fax('test document');
            }).not.toThrow();
        });
    });

    describe('OldFashionedPrinter', () => {
        let printer: OldFashionedPrinter;

        beforeEach(() => {
            printer = new OldFashionedPrinter();
        });

        test('should create instance correctly', () => {
            expect(printer).toBeInstanceOf(OldFashionedPrinter);
            expect(printer).toBeDefined();
        });

        test('should implement OldMachine interface', () => {
            // TypeScript compile-time check ensures this, but we can verify behavior
            const machineInterface: OldMachine = printer;
            expect(machineInterface.print).toBeDefined();
        });

        test('should print document correctly', () => {
            printer.print('Test Document');
            
            expect(mockConsoleLog).toHaveBeenCalledTimes(1);
            expect(mockConsoleLog).toHaveBeenCalledWith('Printing document: Test Document');
        });

        test('should handle empty document name', () => {
            printer.print('');
            
            expect(mockConsoleLog).toHaveBeenCalledWith('Printing document: ');
        });

        test('should handle special characters in document name', () => {
            const specialDoc = 'Document with special chars: @#$%^&*()';
            printer.print(specialDoc);
            
            expect(mockConsoleLog).toHaveBeenCalledWith(`Printing document: ${specialDoc}`);
        });

        test('should handle long document names', () => {
            const longDoc = 'A'.repeat(1000);
            printer.print(longDoc);
            
            expect(mockConsoleLog).toHaveBeenCalledWith(`Printing document: ${longDoc}`);
        });

        test('should handle unicode characters', () => {
            const unicodeDoc = 'Document with unicode: 你好世界 🚀 العالم';
            printer.print(unicodeDoc);
            
            expect(mockConsoleLog).toHaveBeenCalledWith(`Printing document: ${unicodeDoc}`);
        });

        test('should handle multiple consecutive prints', () => {
            printer.print('Doc 1');
            printer.print('Doc 2');
            printer.print('Doc 3');
            
            expect(mockConsoleLog).toHaveBeenCalledTimes(3);
            expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Printing document: Doc 1');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'Printing document: Doc 2');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(3, 'Printing document: Doc 3');
        });
    });

    describe('NewFashionedPrinter', () => {
        let printer: NewFashionedPrinter;

        beforeEach(() => {
            printer = new NewFashionedPrinter();
        });

        test('should create instance correctly', () => {
            expect(printer).toBeInstanceOf(NewFashionedPrinter);
            expect(printer).toBeDefined();
        });

        test('should implement NewMachine interface', () => {
            // TypeScript compile-time check ensures this, but we can verify behavior
            const machineInterface: NewMachine = printer;
            expect(machineInterface.print).toBeDefined();
            expect(machineInterface.scan).toBeDefined();
            expect(machineInterface.fax).toBeDefined();
        });

        describe('print functionality', () => {
            test('should print document correctly', () => {
                printer.print('Test Document');
                
                expect(mockConsoleLog).toHaveBeenCalledTimes(1);
                expect(mockConsoleLog).toHaveBeenCalledWith('Printing document: Test Document');
            });

            test('should handle empty document for printing', () => {
                printer.print('');
                
                expect(mockConsoleLog).toHaveBeenCalledWith('Printing document: ');
            });

            test('should handle special characters for printing', () => {
                const specialDoc = 'Print: @#$%^&*()';
                printer.print(specialDoc);
                
                expect(mockConsoleLog).toHaveBeenCalledWith(`Printing document: ${specialDoc}`);
            });
        });

        describe('scan functionality', () => {
            test('should scan document correctly', () => {
                printer.scan('Scan Document');
                
                expect(mockConsoleLog).toHaveBeenCalledTimes(1);
                expect(mockConsoleLog).toHaveBeenCalledWith('Scanning document: Scan Document');
            });

            test('should handle empty document for scanning', () => {
                printer.scan('');
                
                expect(mockConsoleLog).toHaveBeenCalledWith('Scanning document: ');
            });

            test('should handle special characters for scanning', () => {
                const specialDoc = 'Scan: @#$%^&*()';
                printer.scan(specialDoc);
                
                expect(mockConsoleLog).toHaveBeenCalledWith(`Scanning document: ${specialDoc}`);
            });

            test('should handle unicode characters for scanning', () => {
                const unicodeDoc = 'Scan: 你好世界 🔍';
                printer.scan(unicodeDoc);
                
                expect(mockConsoleLog).toHaveBeenCalledWith(`Scanning document: ${unicodeDoc}`);
            });
        });

        describe('fax functionality', () => {
            test('should fax document correctly', () => {
                printer.fax('Fax Document');
                
                expect(mockConsoleLog).toHaveBeenCalledTimes(1);
                expect(mockConsoleLog).toHaveBeenCalledWith('Faxing document: Fax Document');
            });

            test('should handle empty document for faxing', () => {
                printer.fax('');
                
                expect(mockConsoleLog).toHaveBeenCalledWith('Faxing document: ');
            });

            test('should handle special characters for faxing', () => {
                const specialDoc = 'Fax: @#$%^&*()';
                printer.fax(specialDoc);
                
                expect(mockConsoleLog).toHaveBeenCalledWith(`Faxing document: ${specialDoc}`);
            });

            test('should handle unicode characters for faxing', () => {
                const unicodeDoc = 'Fax: 你好世界 📠';
                printer.fax(unicodeDoc);
                
                expect(mockConsoleLog).toHaveBeenCalledWith(`Faxing document: ${unicodeDoc}`);
            });
        });

        describe('combined operations', () => {
            test('should handle all operations in sequence', () => {
                printer.print('Document 1');
                printer.scan('Document 2');
                printer.fax('Document 3');
                
                expect(mockConsoleLog).toHaveBeenCalledTimes(3);
                expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Printing document: Document 1');
                expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'Scanning document: Document 2');
                expect(mockConsoleLog).toHaveBeenNthCalledWith(3, 'Faxing document: Document 3');
            });

            test('should handle same document for all operations', () => {
                const doc = 'Multi-Operation Document';
                
                printer.print(doc);
                printer.scan(doc);
                printer.fax(doc);
                
                expect(mockConsoleLog).toHaveBeenCalledTimes(3);
                expect(mockConsoleLog).toHaveBeenNthCalledWith(1, `Printing document: ${doc}`);
                expect(mockConsoleLog).toHaveBeenNthCalledWith(2, `Scanning document: ${doc}`);
                expect(mockConsoleLog).toHaveBeenNthCalledWith(3, `Faxing document: ${doc}`);
            });

            test('should handle multiple operations of same type', () => {
                printer.print('Print 1');
                printer.print('Print 2');
                printer.scan('Scan 1');
                printer.scan('Scan 2');
                printer.fax('Fax 1');
                printer.fax('Fax 2');
                
                expect(mockConsoleLog).toHaveBeenCalledTimes(6);
                expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Printing document: Print 1');
                expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'Printing document: Print 2');
                expect(mockConsoleLog).toHaveBeenNthCalledWith(3, 'Scanning document: Scan 1');
                expect(mockConsoleLog).toHaveBeenNthCalledWith(4, 'Scanning document: Scan 2');
                expect(mockConsoleLog).toHaveBeenNthCalledWith(5, 'Faxing document: Fax 1');
                expect(mockConsoleLog).toHaveBeenNthCalledWith(6, 'Faxing document: Fax 2');
            });
        });
    });

    describe('ISP Compliance Tests', () => {
        test('should demonstrate interface segregation benefits', () => {
            // Old machine only needs printing interface
            const oldPrinter: OldMachine = new OldFashionedPrinter();
            
            // Client code that only needs printing doesn't depend on scan/fax
            function printOnly(machine: OldMachine, doc: string) {
                machine.print(doc);
            }
            
            expect(() => printOnly(oldPrinter, 'Simple Print')).not.toThrow();
            expect(mockConsoleLog).toHaveBeenCalledWith('Printing document: Simple Print');
        });

        test('should demonstrate full interface usage', () => {
            // New machine supports all operations
            const newPrinter: NewMachine = new NewFashionedPrinter();
            
            // Client code that needs all functions can use complete interface
            function fullOfficeOperations(machine: NewMachine, doc: string) {
                machine.print(doc);
                machine.scan(doc);
                machine.fax(doc);
            }
            
            expect(() => fullOfficeOperations(newPrinter, 'Complete Doc')).not.toThrow();
            expect(mockConsoleLog).toHaveBeenCalledTimes(3);
        });

        test('should prevent forcing unnecessary dependencies', () => {
            // This test demonstrates that OldFashionedPrinter is NOT forced to implement
            // methods it doesn't need (scan, fax), which would violate ISP
            
            const oldPrinter = new OldFashionedPrinter();
            
            // Old printer only has print method
            expect(oldPrinter.print).toBeDefined();
            expect((oldPrinter as any).scan).toBeUndefined();
            expect((oldPrinter as any).fax).toBeUndefined();
            
            // This ensures ISP compliance - no forced implementation of unused methods
        });

        test('should allow different implementations with different capabilities', () => {
            const machines: (OldMachine | NewMachine)[] = [
                new OldFashionedPrinter(),
                new NewFashionedPrinter()
            ];
            
            // Each machine can be used according to its interface
            machines.forEach(machine => {
                // All machines can print
                machine.print('Test Document');
                
                // Only check for additional methods if available
                if ('scan' in machine && typeof machine.scan === 'function') {
                    machine.scan('Test Document');
                }
                if ('fax' in machine && typeof machine.fax === 'function') {
                    machine.fax('Test Document');
                }
            });
            
            // Verify that appropriate methods were called
            expect(mockConsoleLog).toHaveBeenCalledTimes(4); // 2 prints + 1 scan + 1 fax
        });
    });

    describe('Polymorphism and Type Safety', () => {
        test('should maintain type safety with OldMachine', () => {
            const machines: OldMachine[] = [
                new OldFashionedPrinter()
            ];
            
            machines.forEach(machine => {
                expect(() => machine.print('Type Safe Print')).not.toThrow();
            });
        });

        test('should maintain type safety with NewMachine', () => {
            const machines: NewMachine[] = [
                new NewFashionedPrinter()
            ];
            
            machines.forEach(machine => {
                expect(() => {
                    machine.print('Type Safe Print');
                    machine.scan('Type Safe Scan');
                    machine.fax('Type Safe Fax');
                }).not.toThrow();
            });
        });

        test('should demonstrate proper interface assignment', () => {
            // NewFashionedPrinter can be assigned to OldMachine (it has print method)
            const oldInterface: OldMachine = new NewFashionedPrinter();
            expect(() => oldInterface.print('Compatible Print')).not.toThrow();
            
            // When assigned to OldMachine interface, we can only access print method through the interface
            // The actual object still has scan/fax methods, but they're not accessible through the interface type
            const actualObject = oldInterface as any;
            expect(actualObject.scan).toBeDefined(); // The method exists on the actual object
            expect(actualObject.fax).toBeDefined();   // The method exists on the actual object
            
            // This demonstrates proper interface segregation - clients only see methods they need
        });
    });

    describe('Edge Cases and Error Handling', () => {
        test('should handle null/undefined document names gracefully', () => {
            const oldPrinter = new OldFashionedPrinter();
            const newPrinter = new NewFashionedPrinter();
            
            // Test with undefined (TypeScript would normally prevent this, but testing runtime behavior)
            expect(() => oldPrinter.print(undefined as any)).not.toThrow();
            expect(() => newPrinter.print(undefined as any)).not.toThrow();
            expect(() => newPrinter.scan(undefined as any)).not.toThrow();
            expect(() => newPrinter.fax(undefined as any)).not.toThrow();
        });

        test('should handle very long document names', () => {
            const longDoc = 'A'.repeat(10000);
            const oldPrinter = new OldFashionedPrinter();
            const newPrinter = new NewFashionedPrinter();
            
            expect(() => oldPrinter.print(longDoc)).not.toThrow();
            expect(() => newPrinter.print(longDoc)).not.toThrow();
            expect(() => newPrinter.scan(longDoc)).not.toThrow();
            expect(() => newPrinter.fax(longDoc)).not.toThrow();
        });

        test('should handle rapid successive operations', () => {
            const newPrinter = new NewFashionedPrinter();
            
            expect(() => {
                for (let i = 0; i < 100; i++) {
                    newPrinter.print(`Doc ${i}`);
                    newPrinter.scan(`Doc ${i}`);
                    newPrinter.fax(`Doc ${i}`);
                }
            }).not.toThrow();
            
            expect(mockConsoleLog).toHaveBeenCalledTimes(300); // 100 * 3 operations
        });
    });

    describe('Integration Tests', () => {
        test('should work in office workflow scenario', () => {
            // Simulate office with different types of machines
            const basicPrinter = new OldFashionedPrinter();
            const multiFunctionPrinter = new NewFashionedPrinter();
            
            // Basic workflow with old printer
            basicPrinter.print('Letter to Client');
            
            // Advanced workflow with new printer
            multiFunctionPrinter.print('Contract');
            multiFunctionPrinter.scan('Signed Contract');
            multiFunctionPrinter.fax('Contract to Legal');
            
            expect(mockConsoleLog).toHaveBeenCalledTimes(4);
            expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Printing document: Letter to Client');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'Printing document: Contract');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(3, 'Scanning document: Signed Contract');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(4, 'Faxing document: Contract to Legal');
        });

        test('should demonstrate factory pattern compatibility', () => {
            function createMachine(type: 'basic' | 'advanced'): OldMachine | NewMachine {
                switch (type) {
                    case 'basic':
                        return new OldFashionedPrinter();
                    case 'advanced':
                        return new NewFashionedPrinter();
                    default:
                        throw new Error('Unknown machine type');
                }
            }
            
            const basicMachine = createMachine('basic');
            const advancedMachine = createMachine('advanced');
            
            // Both can print
            basicMachine.print('Basic Print');
            advancedMachine.print('Advanced Print');
            
            // Only advanced can scan and fax
            if ('scan' in advancedMachine) {
                advancedMachine.scan('Advanced Scan');
            }
            if ('fax' in advancedMachine) {
                advancedMachine.fax('Advanced Fax');
            }
            
            expect(mockConsoleLog).toHaveBeenCalledTimes(4);
        });
    });
});