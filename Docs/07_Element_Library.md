#  Enterprise Automation Framework

# 07 - Element Library Guide


## Introduction

The Element Library is the core reusable UI interaction layer of the  Enterprise Automation Framework.

It provides enterprise wrapper components over Playwright locators.

Instead of directly using:

```javascript
page.locator()
```

automation developers use:

```javascript
WebTextBox

WebButton

WebDropdown
```

This provides:

- Centralized actions
- Smart waits
- Logging
- Screenshots
- Allure reporting
- Self healing support


---


# Element Architecture


```
Test


  |


Page Object


  |


Web Element


  |


BaseElement


  |


Playwright Locator


  |


Browser
```


Example:


```javascript
Login Test


    |


LoginPage.usernameTextbox


    |


WebTextBox


    |


BaseElement


    |


Playwright
```


---


# Why Element Wrappers?


Avoid:


```javascript
await page
    .locator("#username")
    .fill("admin");
```


Problems:


- Duplicate code
- No logging
- No reporting
- No healing


---


Recommended:


```javascript
await this.usernameTextbox

        .enterText("admin");
```


Automatically provides:


```
Wait

Logging

Screenshot

Self Healing

Reporting
```


---


# Element Declaration Standard


All framework elements follow:


```javascript
new Element(

    page,

    locator,

    elementName

)
```


Example:


```javascript
this.usernameTextbox =

    new WebTextBox(

        page,

        "#username",

        "LoginPage.usernameTextbox"

    );
```


---


# Available Elements


The framework provides:


```
WebTextBox

WebButton

WebCheckBox

WebRadioButton

WebDropdown

WebTable

WebGrid

WebTree

WebFileUpload

WebCalendar

WebLink

WebImage

WebFrame

WebModal

WebAccordion

WebPagination

WebProgressBar

WebSlider

WebTab

WebToast

WebToolTip
```


---


# Common Features Available In All Elements


Inherited from:


```
BaseElement.js
```


Common methods:


## Click


```javascript
await element.click();
```


---


## Double Click


```javascript
await element.doubleClick();
```


---


## Right Click


```javascript
await element.rightClick();
```


---


## Hover


```javascript
await element.hover();
```


---


## Visibility Check


```javascript
await element.isVisible();
```


---


## Enable Check


```javascript
await element.isEnabled();
```


---


## Wait For Visible


```javascript
await element.waitForVisible();
```


---


## Get Text


```javascript
await element.getText();
```


---


# WebTextBox


Purpose:


Handle input fields.


Example:


```javascript
this.username =

new WebTextBox(

    page,

    "#username",

    "LoginPage.username"

);
```


---


# Supported Actions


## Enter Text


```javascript
await username.enterText(
    "admin"
);
```


---


## Clear Text


```javascript
await username.clear();
```


---


## Get Value


```javascript
const value =

await username.getValue();
```


---


# WebButton


Purpose:


Button interactions.


Example:


```javascript
this.submitButton =

new WebButton(

    page,

    "#submit",

    "LoginPage.submitButton"

);
```


---


Actions:


```javascript
await submitButton.click();
```


```javascript
await submitButton.doubleClick();
```


---


# WebLink


Purpose:


Anchor elements.


Example:


```javascript
this.loginLink =

new WebLink(

    page,

    "a[href='login.html']",

    "HomePage.loginLink"

);
```


Usage:


```javascript
await loginLink.click();
```


---


# WebCheckBox


Purpose:


Checkbox handling.


Example:


```javascript
this.rememberMe =

new WebCheckBox(

    page,

    "#remember",

    "LoginPage.rememberMe"

);
```


Methods:


```javascript
await rememberMe.check();


await rememberMe.uncheck();


await rememberMe.isChecked();
```


---


# WebRadioButton


Purpose:


Radio button controls.


Example:


```javascript
this.gender =

new WebRadioButton(

    page,

    "#male",

    "UserPage.gender"

);
```


Usage:


```javascript
await gender.select();
```


---


# WebDropdown


Purpose:


Dropdown/select controls.


Example:


```javascript
this.countryDropdown =

new WebDropdown(

    page,

    "#country",

    "UserPage.country"

);
```


---


Methods:


Select by text:


```javascript
await countryDropdown

.selectByText("India");
```


Select value:


```javascript
await countryDropdown

.selectByValue("IN");
```


Get selected option:


```javascript
await countryDropdown

.getSelectedText();
```


---


# WebTable


Purpose:


HTML table automation.


Example:


```javascript
this.userTable =

new WebTable(

    page,

    "#users",

    "UserPage.table"

);
```


---


Methods:


Row count:


```javascript
await table.getRowCount();
```


Column count:


```javascript
await table.getColumnCount();
```


Cell data:


```javascript
await table.getCellText(
    row,
    column
);
```


---


# WebGrid


Purpose:


Advanced dynamic grids.


Supports:


- Pagination grids
- Dynamic rows
- Filtering


Example:


```javascript
await grid.getRowData(2);
```


---


# WebTree


Purpose:


Tree structures.


Examples:


- Menu trees
- Folder trees


Usage:


```javascript
await tree.expand();


await tree.collapse();
```


---


# WebCalendar


Purpose:


Date picker automation.


Example:


```javascript
await calendar.selectDate(

    "2026-07-06"

);
```


---


# WebFileUpload


Purpose:


Upload files.


Example:


```javascript
await upload.uploadFile(

    "C:/files/test.pdf"

);
```


---


# WebImage


Purpose:


Image validation.


Examples:


```javascript
await image.isLoaded();


await image.getSource();
```


---


# WebFrame


Purpose:


Iframe handling.


Example:


```javascript
await frame.switchToFrame();
```


---


# WebModal


Purpose:


Popup/dialog handling.


Examples:


```javascript
await modal.open();


await modal.close();
```


---


# WebToast


Purpose:


Toast notifications.


Example:


```javascript
await toast.getMessage();
```


---


# WebTab


Purpose:


Tab controls.


Example:


```javascript
await tab.select(
    "Settings"
);
```


---


# WebSlider


Purpose:


Range sliders.


Example:


```javascript
await slider.moveTo(
    50
);
```


---


# WebProgressBar


Purpose:


Progress validation.


Example:


```javascript
await progress.getPercentage();
```


---


# WebToolTip


Purpose:


Tooltip validation.


Example:


```javascript
await tooltip.getToolTipText();
```


---


# Self Healing Support


Every element automatically supports healing.


Flow:


```
Element Action


      |


BaseElement


      |


Locator Failed


      |


SelfHealingEngine


      |


Recovered Locator
```


No extra code required.


---


# Locator Snapshot Example


Generated:


```json
{
    "LoginPage.usernameTextbox": {


        "primary":

        "#username",


        "successfulLocator":

        "#username"

    }
}
```


---


# Element Development Rules


Always:


✔ Use framework elements

✔ Provide meaningful element names

✔ Use stable selectors

✔ Follow Page.Element naming


---


Never:


❌ Use page.locator in tests


❌ Duplicate locators


❌ Add waits in page classes


❌ Handle screenshots manually


---


# Recommended Pattern


Page:


```javascript
this.username =

new WebTextBox(

    page,

    "#username",

    "LoginPage.username"

);
```


Action:


```javascript
await this.username

.enterText("admin");
```


Test:


```javascript
await loginPage.login();
```


---


# Summary


Element Library provides:


✔ Reusable UI components

✔ Clean Page Objects

✔ Centralized actions

✔ Better reporting

✔ Smart waits

✔ Self healing support


---

Author:

Mahesh Upadhyay

 Enterprise Automation Framework