import { PaymentProcessor } from '../../Solid/3.Lsp/payment-processor';
import { CashPayment } from '../../Solid/3.Lsp/cash-payment';
import { CreditCardPayment } from '../../Solid/3.Lsp/impl/credit-card-processcor';
import { PayPalPayment } from '../../Solid/3.Lsp/impl/paypal-processor';

// Mock console.log to capture output
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('LSP - Payment Processing System', () => {
    beforeEach(() => {
        mockConsoleLog.mockClear();
    });

    afterAll(() => {
        mockConsoleLog.mockRestore();
    });

    describe('PaymentProcessor (Base Class)', () => {
        let paymentProcessor: PaymentProcessor;

        beforeEach(() => {
            paymentProcessor = new PaymentProcessor();
        });

        test('should create payment processor instance', () => {
            expect(paymentProcessor).toBeInstanceOf(PaymentProcessor);
        });

        test('should process payment with correct amount', () => {
            paymentProcessor.processPayment(100);
            
            expect(mockConsoleLog).toHaveBeenCalledTimes(1);
            expect(mockConsoleLog).toHaveBeenCalledWith('Processing payment of $100');
        });

        test('should handle zero amount', () => {
            paymentProcessor.processPayment(0);
            
            expect(mockConsoleLog).toHaveBeenCalledWith('Processing payment of $0');
        });

        test('should handle decimal amounts', () => {
            paymentProcessor.processPayment(99.99);
            
            expect(mockConsoleLog).toHaveBeenCalledWith('Processing payment of $99.99');
        });

        test('should handle large amounts', () => {
            paymentProcessor.processPayment(10000);
            
            expect(mockConsoleLog).toHaveBeenCalledWith('Processing payment of $10000');
        });

        test('should handle negative amounts', () => {
            paymentProcessor.processPayment(-50);
            
            expect(mockConsoleLog).toHaveBeenCalledWith('Processing payment of $-50');
        });
    });

    describe('CashPayment', () => {
        let cashPayment: CashPayment;

        beforeEach(() => {
            cashPayment = new CashPayment();
        });

        test('should create cash payment instance', () => {
            expect(cashPayment).toBeInstanceOf(CashPayment);
            expect(cashPayment).toBeInstanceOf(PaymentProcessor);
        });

        test('should process cash payment with specific messages', () => {
            cashPayment.processPayment(50);
            
            expect(mockConsoleLog).toHaveBeenCalledTimes(2);
            expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Processing cash payment of $50');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'Please prepare the cash for collection.');
        });

        test('should handle zero cash payment', () => {
            cashPayment.processPayment(0);
            
            expect(mockConsoleLog).toHaveBeenCalledTimes(2);
            expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Processing cash payment of $0');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'Please prepare the cash for collection.');
        });

        test('should handle decimal cash amounts', () => {
            cashPayment.processPayment(25.75);
            
            expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Processing cash payment of $25.75');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'Please prepare the cash for collection.');
        });

        test('should handle large cash amounts', () => {
            cashPayment.processPayment(5000);
            
            expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Processing cash payment of $5000');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'Please prepare the cash for collection.');
        });
    });

    describe('CreditCardPayment', () => {
        let creditCardPayment: CreditCardPayment;

        beforeEach(() => {
            creditCardPayment = new CreditCardPayment();
        });

        test('should create credit card payment instance', () => {
            expect(creditCardPayment).toBeInstanceOf(CreditCardPayment);
            expect(creditCardPayment).toBeInstanceOf(PaymentProcessor);
        });

        test('should process credit card payment with specific workflow', () => {
            creditCardPayment.processPayment(100);
            
            expect(mockConsoleLog).toHaveBeenCalledTimes(3);
            expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Processing credit card payment of $100');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'Validating credit card details...');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(3, 'Charging the credit card...');
        });

        test('should handle zero credit card payment', () => {
            creditCardPayment.processPayment(0);
            
            expect(mockConsoleLog).toHaveBeenCalledTimes(3);
            expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Processing credit card payment of $0');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'Validating credit card details...');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(3, 'Charging the credit card...');
        });

        test('should handle decimal credit card amounts', () => {
            creditCardPayment.processPayment(149.99);
            
            expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Processing credit card payment of $149.99');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'Validating credit card details...');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(3, 'Charging the credit card...');
        });

        test('should handle large credit card amounts', () => {
            creditCardPayment.processPayment(999999);
            
            expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Processing credit card payment of $999999');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'Validating credit card details...');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(3, 'Charging the credit card...');
        });
    });

    describe('PayPalPayment', () => {
        let paypalPayment: PayPalPayment;

        beforeEach(() => {
            paypalPayment = new PayPalPayment();
        });

        test('should create PayPal payment instance', () => {
            expect(paypalPayment).toBeInstanceOf(PayPalPayment);
            expect(paypalPayment).toBeInstanceOf(PaymentProcessor);
        });

        test('should process PayPal payment with specific workflow', () => {
            paypalPayment.processPayment(200);
            
            expect(mockConsoleLog).toHaveBeenCalledTimes(3);
            expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Processing PayPal payment of $200');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'Redirecting to PayPal...');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(3, 'Completing PayPal transaction...');
        });

        test('should handle zero PayPal payment', () => {
            paypalPayment.processPayment(0);
            
            expect(mockConsoleLog).toHaveBeenCalledTimes(3);
            expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Processing PayPal payment of $0');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'Redirecting to PayPal...');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(3, 'Completing PayPal transaction...');
        });

        test('should handle decimal PayPal amounts', () => {
            paypalPayment.processPayment(75.50);
            
            expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Processing PayPal payment of $75.5');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'Redirecting to PayPal...');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(3, 'Completing PayPal transaction...');
        });

        test('should handle large PayPal amounts', () => {
            paypalPayment.processPayment(50000);
            
            expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Processing PayPal payment of $50000');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'Redirecting to PayPal...');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(3, 'Completing PayPal transaction...');
        });
    });

    describe('LSP - Liskov Substitution Principle Tests', () => {
        // Test that demonstrates LSP compliance - all subclasses can substitute the base class
        function handlePayment(paymentProcessor: PaymentProcessor, amount: number): void {
            paymentProcessor.processPayment(amount);
        }

        test('should allow CreditCardPayment to substitute PaymentProcessor', () => {
            const creditCard = new CreditCardPayment();
            
            // This should work without any issues (LSP compliance)
            expect(() => handlePayment(creditCard, 100)).not.toThrow();
            
            expect(mockConsoleLog).toHaveBeenCalledTimes(3);
            expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Processing credit card payment of $100');
        });

        test('should allow PayPalPayment to substitute PaymentProcessor', () => {
            const paypal = new PayPalPayment();
            
            // This should work without any issues (LSP compliance)
            expect(() => handlePayment(paypal, 200)).not.toThrow();
            
            expect(mockConsoleLog).toHaveBeenCalledTimes(3);
            expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Processing PayPal payment of $200');
        });

        test('should allow CashPayment to substitute PaymentProcessor', () => {
            const cash = new CashPayment();
            
            // This should work without any issues (LSP compliance)
            expect(() => handlePayment(cash, 50)).not.toThrow();
            
            expect(mockConsoleLog).toHaveBeenCalledTimes(2);
            expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Processing cash payment of $50');
        });

        test('should allow base PaymentProcessor to be used directly', () => {
            const baseProcessor = new PaymentProcessor();
            
            expect(() => handlePayment(baseProcessor, 75)).not.toThrow();
            
            expect(mockConsoleLog).toHaveBeenCalledTimes(1);
            expect(mockConsoleLog).toHaveBeenCalledWith('Processing payment of $75');
        });

        test('should demonstrate polymorphic behavior with array of processors', () => {
            const processors: PaymentProcessor[] = [
                new PaymentProcessor(),
                new CreditCardPayment(),
                new PayPalPayment(),
                new CashPayment()
            ];

            processors.forEach((processor, index) => {
                handlePayment(processor, (index + 1) * 100);
            });

            // Verify all processors were called
            expect(mockConsoleLog).toHaveBeenCalledTimes(9); // 1 + 3 + 3 + 2 = 9 total calls
            
            // Check base processor call
            expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Processing payment of $100');
            
            // Check credit card calls
            expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'Processing credit card payment of $200');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(3, 'Validating credit card details...');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(4, 'Charging the credit card...');
            
            // Check PayPal calls
            expect(mockConsoleLog).toHaveBeenNthCalledWith(5, 'Processing PayPal payment of $300');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(6, 'Redirecting to PayPal...');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(7, 'Completing PayPal transaction...');
            
            // Check cash calls
            expect(mockConsoleLog).toHaveBeenNthCalledWith(8, 'Processing cash payment of $400');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(9, 'Please prepare the cash for collection.');
        });

        test('should maintain consistent interface across all implementations', () => {
            const processors = [
                new PaymentProcessor(),
                new CreditCardPayment(),
                new PayPalPayment(),
                new CashPayment()
            ];

            // All processors should have the same method signature
            processors.forEach(processor => {
                expect(processor.processPayment).toBeDefined();
                expect(typeof processor.processPayment).toBe('function');
                expect(processor.processPayment.length).toBe(1); // Should accept 1 parameter
            });
        });

        test('should handle edge cases consistently across all implementations', () => {
            const processors = [
                new PaymentProcessor(),
                new CreditCardPayment(),
                new PayPalPayment(),
                new CashPayment()
            ];

            // Test with negative amount
            processors.forEach(processor => {
                expect(() => processor.processPayment(-10)).not.toThrow();
            });

            // Test with zero amount
            processors.forEach(processor => {
                expect(() => processor.processPayment(0)).not.toThrow();
            });

            // Test with very large amount
            processors.forEach(processor => {
                expect(() => processor.processPayment(Number.MAX_SAFE_INTEGER)).not.toThrow();
            });
        });
    });

    describe('Integration Tests', () => {
        test('should work in a payment system context', () => {
            // Simulate a payment system that processes different payment types
            const paymentQueue = [
                { processor: new CreditCardPayment(), amount: 99.99 },
                { processor: new PayPalPayment(), amount: 250.00 },
                { processor: new CashPayment(), amount: 45.50 },
                { processor: new PaymentProcessor(), amount: 120.00 }
            ];

            paymentQueue.forEach(payment => {
                expect(() => {
                    payment.processor.processPayment(payment.amount);
                }).not.toThrow();
            });

            // Verify all payments were processed (total console.log calls)
            expect(mockConsoleLog).toHaveBeenCalledTimes(9); // 3+3+2+1 = 9
        });

        test('should demonstrate real-world usage scenario', () => {
            // Factory-like function that returns different processors
            function createPaymentProcessor(type: string): PaymentProcessor {
                switch (type) {
                    case 'credit':
                        return new CreditCardPayment();
                    case 'paypal':
                        return new PayPalPayment();
                    case 'cash':
                        return new CashPayment();
                    default:
                        return new PaymentProcessor();
                }
            }

            const paymentTypes = ['credit', 'paypal', 'cash', 'default'];
            
            paymentTypes.forEach(type => {
                const processor = createPaymentProcessor(type);
                expect(processor).toBeInstanceOf(PaymentProcessor);
                expect(() => processor.processPayment(100)).not.toThrow();
            });
        });
    });
});