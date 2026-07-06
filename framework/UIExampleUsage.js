//TextBox & Button
import { WebButton } from "./ui/WebButton.js";
import { WebTextBox } from "./ui/WebTextBox.js";

export class LoginPage {

    constructor(page) {

        this.username = new WebTextBox(
            page.getByPlaceholder("Username"),
            "Username"
        );

        this.password = new WebTextBox(
            page.getByPlaceholder("Password"),
            "Password"
        );

        this.loginButton = new WebButton(
            page.getByRole("button", {
                name: "Login"
            }),
            "Login Button"
        );

    }

}
//Test
await loginPage.username.enterText("admin");

await loginPage.password.enterText("admin123");

await loginPage.loginButton.verifyEnabled();

await loginPage.loginButton.safeClick();
///////////////////////////////////////////////////////////////////////////
//CheckBox
import { WebCheckBox } from "./ui/WebCheckBox.js";

export class LoginPage {

    constructor(page) {

        this.rememberMe = new WebCheckBox(
            page.getByLabel("Remember Me"),
            "Remember Me Checkbox"
        );

    }

}
//Test
await loginPage.rememberMe.check();

await loginPage.rememberMe.verifyChecked();

await loginPage.rememberMe.uncheck();

await loginPage.rememberMe.verifyUnchecked();

await loginPage.rememberMe.toggle();

const checked = await loginPage.rememberMe.isChecked();

//WebTable
await usersTable.getRowCount();

await usersTable.getColumnCount();

await usersTable.getHeaders();

await usersTable.getCellText(2, 3);

await usersTable.getRow(4);

await usersTable.getColumn(2);

await usersTable.findRowByText("John");

await usersTable.findRowByColumnValue(
    "Status",
    "Active"
);

await usersTable.clickCell(3, 2);

await usersTable.verifyCellText(
    3,
    2,
    "Approved"
);

await usersTable.verifyRowCount(25);

await usersTable.verifyColumnCount(6);

await usersTable.isEmpty();

//WebFileUpload
//Example usage of WebFileUpload class:
import { WebFileUpload } from "./ui/WebFileUpload.js";

export class EmployeePage {

    constructor(page) {

        this.resumeUpload = new WebFileUpload(
            page.locator("#resume"),
            "Resume Upload"
        );

    }

}
//Test
await employeePage.resumeUpload.upload("./testData/resume.pdf");

await employeePage.resumeUpload.verifyFileName("resume.pdf");
//Multiple Test
await employeePage.resumeUpload.uploadMultiple([
    "./files/file1.pdf",
    "./files/file2.pdf"
]);

await employeePage.resumeUpload.verifyFileCount(2);

//WebCalendar
//Example usage - Page Object
this.dateOfBirth = new WebCalendar(
    page.locator("#dob"),
    "Date of Birth"
);
//Test
await employeePage.dateOfBirth.selectDate("1995-08-15");

await employeePage.dateOfBirth.verifySelectedDate("1995-08-15");

await employeePage.dateOfBirth.clear();

/*I would not implement methods like:

selectToday()

selectTomorrow()

selectYesterday()

selectNextMonth()

selectPreviousMonth()

selectYear()

selectMonth()

selectDay()

inside this class.

Those only work for calendar widgets, not native HTML date inputs.

Instead, I'd introduce a DateUtil later:

await calendar.selectDate(
    DateUtil.today()
);

await calendar.selectDate(
    DateUtil.tomorrow()
);

await calendar.selectDate(
    DateUtil.plusDays(7)
);

This keeps WebCalendar focused on interacting with the control, while DateUtil is responsible for calculating dates.*/

//WebLink
//Example Usage-Page Object
this.forgotPasswordLink = new WebLink(
    page.getByRole("link", { name: "Forgot Password?" }),
    "Forgot Password Link"
);
//Test
await loginPage.forgotPasswordLink.verifyVisible();

await loginPage.forgotPasswordLink.verifyHref("/forgot-password");

await loginPage.forgotPasswordLink.open();

//WebImage
//Example Usage - Page Object
this.companyLogo = new WebImage(
    page.locator(".company-logo img"),
    "Company Logo"
);
//Test
await homePage.companyLogo.verifyVisible();

await homePage.companyLogo.verifyLoaded();

await homePage.companyLogo.verifyAltText("Company Logo");

await homePage.companyLogo.click();

//WebFrame
//Example Usage
import { WebFrame } from "./ui/WebFrame.js";
import { WebButton } from "./ui/WebButton.js";
import { WebTextBox } from "./ui/WebTextBox.js";

export class PaymentPage {

    constructor(page) {

        this.paymentFrame = new WebFrame(
            page.frameLocator("#payment-frame"),
            "Payment Frame"
        );

        this.cardNumber = new WebTextBox(
            this.paymentFrame.getByPlaceholder("Card Number"),
            "Card Number"
        );

        this.payButton = new WebButton(
            this.paymentFrame.getByRole("button", {
                name: "Pay Now"
            }),
            "Pay Now Button"
        );

    }

}
//Test
await paymentPage.cardNumber.enterText("4111111111111111");

await paymentPage.payButton.click();
/*Why I don't inherit from BaseElement

If we inherit:

class WebFrame extends BaseElement

we get methods like:

click()

hover()

doubleClick()

dragTo()

highlight()

None of those make sense for an iframe itself.

A frame's responsibility is finding elements inside the frame, not behaving like an element.*/

//WebModal
//Example Usage-Page Object
this.deleteConfirmation = new WebModal(
    page.locator(".modal"),
    "Delete Confirmation"
);
//Test
await employeePage.deleteConfirmation.waitUntilOpened();

await employeePage.deleteConfirmation.verifyTitle(
    "Delete Employee"
);

await employeePage.deleteConfirmation.verifyBodyContains(
    "Are you sure"
);

await employeePage.deleteConfirmation.clickButton("Yes");

await employeePage.deleteConfirmation.waitUntilClosed();

//WebTab
//Example Usage-Page Object
this.detailsTab = new WebTab(
    page.getByRole("tab", { name: "Details" }),
    "Details Tab"
);

this.ordersTab = new WebTab(
    page.getByRole("tab", { name: "Orders" }),
    "Orders Tab"
);
//Test
await customerPage.ordersTab.select();

await customerPage.ordersTab.verifySelected();

await customerPage.detailsTab.verifyNotSelected();

//WebAccordion
//Example Usage=Page Object
this.personalDetailsAccordion = new WebAccordion(
    page.getByRole("button", {
        name: "Personal Details"
    }),
    "Personal Details Accordion"
);

this.addressAccordion = new WebAccordion(
    page.getByRole("button", {
        name: "Address"
    }),
    "Address Accordion"
);
//Test
await employeePage.personalDetailsAccordion.expand();

await employeePage.personalDetailsAccordion.verifyExpanded();

await employeePage.addressAccordion.collapse();

await employeePage.addressAccordion.verifyCollapsed();

//WebSlider
//Example Usage=Page Object
this.volumeSlider = new WebSlider(
    page.locator("#volume"),
    "Volume Slider"
);
//Test
await settingsPage.volumeSlider.setValue(75);

await settingsPage.volumeSlider.verifyValue(75);

await settingsPage.volumeSlider.setMaximum();

await settingsPage.volumeSlider.verifyMaximum(100);

//WebProgressBar
//Example Usage=Page Object
this.uploadProgress = new WebProgressBar(
    page.locator(".progress-bar"),
    "Upload Progress"
);
//Test
await uploadPage.uploadButton.click();

await uploadPage.uploadProgress.waitUntilCompleted();

await uploadPage.uploadProgress.verifyCompleted();

await uploadPage.uploadProgress.verifyPercentage(100);

//WebPagination
//Example Usage-Page Object
this.employeePagination = new WebPagination(
    page.locator(".pagination"),
    "Employee Pagination"
);
//Test
await employeePage.employeePagination.goToPage(5);

await employeePage.employeePagination.verifyCurrentPage(5);

await employeePage.employeePagination.next();

await employeePage.employeePagination.verifyCurrentPage(6);

await employeePage.employeePagination.last();

//BasePage
//Example Usage
LoginPage.js
import { BasePage } from "../framework/core/BasePage.js";
import { WebTextBox } from "../framework/ui/WebTextBox.js";
import { WebButton } from "../framework/ui/WebButton.js";

export class LoginPage extends BasePage {

    constructor(page) {

        super(page);

        this.username = new WebTextBox(
            page.locator("#username"),
            "Username"
        );

        this.password = new WebTextBox(
            page.locator("#password"),
            "Password"
        );

        this.loginButton = new WebButton(
            page.locator("#login"),
            "Login"
        );

    }

    async login(username, password) {

        await this.username.enterText(username);

        await this.password.enterText(password);

        await this.loginButton.click();

    }

}