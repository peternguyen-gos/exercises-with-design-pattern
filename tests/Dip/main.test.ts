import { NotificationInterface } from '../../Solid/5.Dip/notification.interface';
import { SendNotification } from '../../Solid/5.Dip/notification.service';
import { EmailService } from '../../Solid/5.Dip/impl/email.service';

// Mock console.log to capture output
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('DIP - Dependency Inversion Principle', () => {
    beforeEach(() => {
        mockConsoleLog.mockClear();
    });

    afterAll(() => {
        mockConsoleLog.mockRestore();
    });

    describe('NotificationInterface', () => {
        test('should define sendNotification method signature', () => {
            // Since TypeScript interfaces don't exist at runtime, we test through implementations
            const emailService = new EmailService();
            
            // Should have sendNotification method
            expect(emailService.sendNotification).toBeDefined();
            expect(typeof emailService.sendNotification).toBe('function');
            expect(emailService.sendNotification.length).toBe(1); // Should accept 1 parameter
        });

        test('should allow different implementations', () => {
            // Create a mock implementation for testing interface compliance
            class MockNotificationService implements NotificationInterface {
                sendNotification(message: string): void {
                    console.log(`Mock notification: ${message}`);
                }
            }

            const mockService = new MockNotificationService();
            expect(mockService.sendNotification).toBeDefined();
            expect(typeof mockService.sendNotification).toBe('function');
        });
    });

    describe('EmailService', () => {
        let emailService: EmailService;

        beforeEach(() => {
            emailService = new EmailService();
        });

        test('should create instance correctly', () => {
            expect(emailService).toBeInstanceOf(EmailService);
            expect(emailService).toBeDefined();
        });

        test('should implement NotificationInterface', () => {
            // TypeScript compile-time check ensures this, but we can verify behavior
            const notificationInterface: NotificationInterface = emailService;
            expect(notificationInterface.sendNotification).toBeDefined();
        });

        test('should send notification with correct message', () => {
            const message = 'Test email notification';
            emailService.sendNotification(message);
            
            expect(mockConsoleLog).toHaveBeenCalledTimes(1);
            expect(mockConsoleLog).toHaveBeenCalledWith(`Sending email with message: ${message}`);
        });

        test('should handle empty message', () => {
            emailService.sendNotification('');
            
            expect(mockConsoleLog).toHaveBeenCalledWith('Sending email with message: ');
        });

        test('should handle special characters in message', () => {
            const specialMessage = 'Message with special chars: @#$%^&*()!';
            emailService.sendNotification(specialMessage);
            
            expect(mockConsoleLog).toHaveBeenCalledWith(`Sending email with message: ${specialMessage}`);
        });

        test('should handle unicode characters', () => {
            const unicodeMessage = 'Unicode message: 你好世界 🚀 العالم';
            emailService.sendNotification(unicodeMessage);
            
            expect(mockConsoleLog).toHaveBeenCalledWith(`Sending email with message: ${unicodeMessage}`);
        });

        test('should handle very long messages', () => {
            const longMessage = 'A'.repeat(1000);
            emailService.sendNotification(longMessage);
            
            expect(mockConsoleLog).toHaveBeenCalledWith(`Sending email with message: ${longMessage}`);
        });

        test('should handle null/undefined messages gracefully', () => {
            // Test with undefined (TypeScript would normally prevent this, but testing runtime behavior)
            expect(() => emailService.sendNotification(undefined as any)).not.toThrow();
            expect(() => emailService.sendNotification(null as any)).not.toThrow();
        });

        test('should handle multiple consecutive notifications', () => {
            emailService.sendNotification('Message 1');
            emailService.sendNotification('Message 2');
            emailService.sendNotification('Message 3');
            
            expect(mockConsoleLog).toHaveBeenCalledTimes(3);
            expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Sending email with message: Message 1');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'Sending email with message: Message 2');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(3, 'Sending email with message: Message 3');
        });
    });

    describe('SendNotification', () => {
        let emailService: EmailService;
        let sendNotification: SendNotification;

        beforeEach(() => {
            emailService = new EmailService();
            sendNotification = new SendNotification(emailService);
        });

        test('should create instance correctly with dependency injection', () => {
            expect(sendNotification).toBeInstanceOf(SendNotification);
            expect(sendNotification).toBeDefined();
        });

        test('should accept NotificationInterface in constructor', () => {
            // Test that constructor accepts interface type
            const customService: NotificationInterface = new EmailService();
            const notification = new SendNotification(customService);
            
            expect(notification).toBeInstanceOf(SendNotification);
        });

        test('should delegate notification to injected service', () => {
            const message = 'Delegated message';
            sendNotification.sendNotification(message);
            
            expect(mockConsoleLog).toHaveBeenCalledTimes(1);
            expect(mockConsoleLog).toHaveBeenCalledWith(`Sending email with message: ${message}`);
        });

        test('should handle empty message delegation', () => {
            sendNotification.sendNotification('');
            
            expect(mockConsoleLog).toHaveBeenCalledWith('Sending email with message: ');
        });

        test('should handle special characters in delegated message', () => {
            const specialMessage = 'Delegated: @#$%^&*()!';
            sendNotification.sendNotification(specialMessage);
            
            expect(mockConsoleLog).toHaveBeenCalledWith(`Sending email with message: ${specialMessage}`);
        });

        test('should handle unicode characters in delegated message', () => {
            const unicodeMessage = 'Delegated: 你好世界 🚀';
            sendNotification.sendNotification(unicodeMessage);
            
            expect(mockConsoleLog).toHaveBeenCalledWith(`Sending email with message: ${unicodeMessage}`);
        });

        test('should handle very long delegated messages', () => {
            const longMessage = 'B'.repeat(500);
            sendNotification.sendNotification(longMessage);
            
            expect(mockConsoleLog).toHaveBeenCalledWith(`Sending email with message: ${longMessage}`);
        });

        test('should handle null/undefined delegated messages gracefully', () => {
            expect(() => sendNotification.sendNotification(undefined as any)).not.toThrow();
            expect(() => sendNotification.sendNotification(null as any)).not.toThrow();
        });

        test('should handle multiple consecutive delegated notifications', () => {
            sendNotification.sendNotification('Delegated 1');
            sendNotification.sendNotification('Delegated 2');
            sendNotification.sendNotification('Delegated 3');
            
            expect(mockConsoleLog).toHaveBeenCalledTimes(3);
            expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Sending email with message: Delegated 1');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'Sending email with message: Delegated 2');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(3, 'Sending email with message: Delegated 3');
        });
    });

    describe('DIP Compliance Tests', () => {
        test('should demonstrate dependency inversion benefits', () => {
            // High-level module (SendNotification) should not depend on low-level module (EmailService)
            // Both should depend on abstraction (NotificationInterface)
            
            const emailService: NotificationInterface = new EmailService();
            const notification = new SendNotification(emailService);
            
            expect(() => notification.sendNotification('DIP Test')).not.toThrow();
            expect(mockConsoleLog).toHaveBeenCalledWith('Sending email with message: DIP Test');
        });

        test('should allow easy substitution of dependencies', () => {
            // Create alternative implementation for testing DIP
            class SMSService implements NotificationInterface {
                sendNotification(message: string): void {
                    console.log(`Sending SMS with message: ${message}`);
                }
            }

            const smsService: NotificationInterface = new SMSService();
            const notification = new SendNotification(smsService);
            
            notification.sendNotification('SMS Test');
            
            expect(mockConsoleLog).toHaveBeenCalledWith('Sending SMS with message: SMS Test');
        });

        test('should work with any NotificationInterface implementation', () => {
            // Create push notification implementation
            class PushNotificationService implements NotificationInterface {
                sendNotification(message: string): void {
                    console.log(`Sending push notification with message: ${message}`);
                }
            }

            const pushService: NotificationInterface = new PushNotificationService();
            const notification = new SendNotification(pushService);
            
            notification.sendNotification('Push Test');
            
            expect(mockConsoleLog).toHaveBeenCalledWith('Sending push notification with message: Push Test');
        });

        test('should demonstrate inversion of control', () => {
            // SendNotification doesn't create its dependency, it receives it (IoC)
            const mockService: NotificationInterface = {
                sendNotification: jest.fn()
            };

            const notification = new SendNotification(mockService);
            notification.sendNotification('IoC Test');
            
            expect(mockService.sendNotification).toHaveBeenCalledWith('IoC Test');
        });

        test('should prevent tight coupling between classes', () => {
            // SendNotification is not tightly coupled to EmailService
            // It can work with any NotificationInterface implementation
            
            class SlackService implements NotificationInterface {
                sendNotification(message: string): void {
                    console.log(`Sending Slack message: ${message}`);
                }
            }

            class TeamsService implements NotificationInterface {
                sendNotification(message: string): void {
                    console.log(`Sending Teams message: ${message}`);
                }
            }

            const services: NotificationInterface[] = [
                new EmailService(),
                new SlackService(),
                new TeamsService()
            ];

            services.forEach((service, index) => {
                const notification = new SendNotification(service);
                notification.sendNotification(`Message ${index + 1}`);
            });

            expect(mockConsoleLog).toHaveBeenCalledTimes(3);
            expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Sending email with message: Message 1');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'Sending Slack message: Message 2');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(3, 'Sending Teams message: Message 3');
        });

        test('should follow dependency injection pattern', () => {
            // Constructor injection - dependencies are injected through constructor
            const emailService = new EmailService();
            const notification1 = new SendNotification(emailService);
            
            expect(notification1).toBeInstanceOf(SendNotification);
            
            // Different service injected
            class WebhookService implements NotificationInterface {
                sendNotification(message: string): void {
                    console.log(`Sending webhook: ${message}`);
                }
            }
            
            const webhookService = new WebhookService();
            const notification2 = new SendNotification(webhookService);
            
            expect(notification2).toBeInstanceOf(SendNotification);
            
            // Both instances work independently
            notification1.sendNotification('Email notification');
            notification2.sendNotification('Webhook notification');
            
            expect(mockConsoleLog).toHaveBeenCalledTimes(2);
        });
    });

    describe('Polymorphism and Interface Compliance', () => {
        test('should maintain consistent interface across all implementations', () => {
            class MockService1 implements NotificationInterface {
                sendNotification(message: string): void {
                    console.log(`Mock1: ${message}`);
                }
            }

            class MockService2 implements NotificationInterface {
                sendNotification(message: string): void {
                    console.log(`Mock2: ${message}`);
                }
            }

            const services = [
                new EmailService(),
                new MockService1(),
                new MockService2()
            ];

            // All services should have the same method signature
            services.forEach(service => {
                expect(service.sendNotification).toBeDefined();
                expect(typeof service.sendNotification).toBe('function');
                expect(service.sendNotification.length).toBe(1);
            });
        });

        test('should work with array of notification services', () => {
            class BatchNotificationService {
                private services: NotificationInterface[];

                constructor(services: NotificationInterface[]) {
                    this.services = services;
                }

                broadcast(message: string): void {
                    this.services.forEach(service => {
                        service.sendNotification(message);
                    });
                }
            }

            const services: NotificationInterface[] = [
                new EmailService(),
                {
                    sendNotification: (msg: string) => console.log(`Custom: ${msg}`)
                }
            ];

            const batchService = new BatchNotificationService(services);
            batchService.broadcast('Broadcast message');

            expect(mockConsoleLog).toHaveBeenCalledTimes(2);
            expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Sending email with message: Broadcast message');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'Custom: Broadcast message');
        });
    });

    describe('Edge Cases and Error Handling', () => {
        test('should handle rapid successive notifications', () => {
            const emailService = new EmailService();
            const notification = new SendNotification(emailService);
            
            expect(() => {
                for (let i = 0; i < 100; i++) {
                    notification.sendNotification(`Message ${i}`);
                }
            }).not.toThrow();
            
            expect(mockConsoleLog).toHaveBeenCalledTimes(100);
        });

        test('should handle various message formats', () => {
            const emailService = new EmailService();
            const notification = new SendNotification(emailService);
            
            const messages = [
                'Plain text',
                '{"json": "message"}',
                '<html><body>HTML message</body></html>',
                'Multi\nline\nmessage',
                'Message with\ttabs',
                'Message with "quotes" and \'apostrophes\'',
                '!@#$%^&*()_+-={}[]|\\:";\'<>?,./`~'
            ];

            messages.forEach(msg => {
                expect(() => notification.sendNotification(msg)).not.toThrow();
            });

            expect(mockConsoleLog).toHaveBeenCalledTimes(messages.length);
        });

        test('should work with extremely large messages', () => {
            const emailService = new EmailService();
            const notification = new SendNotification(emailService);
            
            const hugeMessage = 'A'.repeat(100000);
            
            expect(() => notification.sendNotification(hugeMessage)).not.toThrow();
            expect(mockConsoleLog).toHaveBeenCalledWith(`Sending email with message: ${hugeMessage}`);
        });
    });

    describe('Integration Tests', () => {
        test('should work in notification system context', () => {
            // Simulate a notification system with multiple services
            const emailService = new EmailService();
            const emailNotification = new SendNotification(emailService);
            
            // Simulate sending different types of notifications
            emailNotification.sendNotification('Welcome email');
            emailNotification.sendNotification('Password reset email');
            emailNotification.sendNotification('Newsletter subscription');
            
            expect(mockConsoleLog).toHaveBeenCalledTimes(3);
            expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Sending email with message: Welcome email');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'Sending email with message: Password reset email');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(3, 'Sending email with message: Newsletter subscription');
        });

        test('should demonstrate factory pattern compatibility', () => {
            function createNotificationService(type: 'email' | 'sms'): NotificationInterface {
                switch (type) {
                    case 'email':
                        return new EmailService();
                    case 'sms':
                        return {
                            sendNotification: (msg: string) => console.log(`SMS: ${msg}`)
                        };
                    default:
                        throw new Error('Unknown notification type');
                }
            }
            
            const emailService = createNotificationService('email');
            const smsService = createNotificationService('sms');
            
            const emailNotification = new SendNotification(emailService);
            const smsNotification = new SendNotification(smsService);
            
            emailNotification.sendNotification('Factory email');
            smsNotification.sendNotification('Factory SMS');
            
            expect(mockConsoleLog).toHaveBeenCalledTimes(2);
            expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Sending email with message: Factory email');
            expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'SMS: Factory SMS');
        });

        test('should support configuration-based service selection', () => {
            const config = {
                notificationMethod: 'email',
                enableLogging: true
            };

            function createConfiguredNotification(config: any): SendNotification {
                let service: NotificationInterface;
                
                if (config.notificationMethod === 'email') {
                    service = new EmailService();
                } else {
                    service = {
                        sendNotification: (msg: string) => console.log(`Default: ${msg}`)
                    };
                }
                
                return new SendNotification(service);
            }
            
            const notification = createConfiguredNotification(config);
            notification.sendNotification('Configured message');
            
            expect(mockConsoleLog).toHaveBeenCalledWith('Sending email with message: Configured message');
        });
    });
});