/**
 * *****************************************
 * 📝 UNCOMMENT THE PRACTICE SECTION CODE YOU WANT BELOW AND START YOUR SOLUTION
 * *****************************************
 *
 * The following lines are currently commented out.
 * Uncomment them to start implementing your solution.
 * Happy coding! 🚀
 */
import { PaymentProcessor } from "./payment-processor";
import { CashPayment } from "./cash-payment";
import { CreditCardPayment } from "./impl/credit-card-processcor";
import { PayPalPayment } from "./impl/paypal-processor";

function handlePayment(paymentProcessor: PaymentProcessor, amount: number): void {
    paymentProcessor.processPayment(amount);
}

const creditCardPayment = new CreditCardPayment();
handlePayment(creditCardPayment, 100); // Output: Processed payment successfully

const payPalPayment = new PayPalPayment();
handlePayment(payPalPayment, 200); // Output: Processed payment successfully

const cashPayment = new CashPayment();
handlePayment(cashPayment, 50); // Output: Error: Cannot process cash payment online!
