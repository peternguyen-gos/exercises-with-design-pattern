import { NotificationInterface } from './notification.interface';

export class SendNotification {
    private notificationService: NotificationInterface;

    constructor(notificationService: NotificationInterface) {
        this.notificationService = notificationService;
    }

    sendNotification(message: string): void {
        this.notificationService.sendNotification(message);
    }
}