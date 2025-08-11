import { PaymentProcessor } from "./payment-processor";

export class CashPayment extends PaymentProcessor {
    processPayment(amount: number): void {
        console.log(`Processing cash payment of $${amount}`);
        console.log("Please prepare the cash for collection.");
    }
}