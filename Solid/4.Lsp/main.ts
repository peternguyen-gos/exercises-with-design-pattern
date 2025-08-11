/**
 * *****************************************
 * 📝 UNCOMMENT THE CODE BELOW AND BEGIN YOUR SOLUTION:
 * *****************************************
 *
 * The following lines are currently commented out.
 * Uncomment them to start implementing your solution.
 * Happy coding! 🚀
 */
import { OldFashionedPrinter } from "./impl/fashioned.old-printer";
import { NewFashionedPrinter } from "./impl/fashioned.new-printer";

const printer = new OldFashionedPrinter();
printer.print("Document 1");

const newPrinter = new NewFashionedPrinter();
newPrinter.print("Document 4");
newPrinter.scan("Document 5");
newPrinter.fax("Document 6");