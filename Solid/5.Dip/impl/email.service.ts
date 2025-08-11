import { NotificationInterface } from '../notification.interface';

export class EmailService implements NotificationInterface {
    sendNotification(message: string): void {
        console.log(`Sending email with message: ${message}`);
    }
}