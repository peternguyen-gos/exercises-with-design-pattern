/**
 * *****************************************
 * 📝 UNCOMMENT THE PRACTICE SECTION CODE YOU WANT BELOW AND START YOUR SOLUTION
 * *****************************************
 *
 * The following lines are currently commented out.
 * Uncomment them to start implementing your solution.
 * Happy coding! 🚀
 */

import { SendNotification } from "./notification.service";
import { EmailService } from "./impl/email.service";




const notification = new SendNotification(new EmailService());
notification.sendNotification("Hello, this is a notification!");