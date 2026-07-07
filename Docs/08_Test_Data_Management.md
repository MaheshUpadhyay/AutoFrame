#  Enterprise Automation Framework

# 08 - Test Data Management Guide


## Introduction

Test Data Management is responsible for handling application test data in a centralized and reusable way.

The framework supports:

- JSON Data
- CSV Data
- Excel Data
- Environment Based Data
- Project Based Data
- Data Caching


The goal:

```
Separate Test Logic

        from

Test Data
```


Tests should not contain hardcoded data.


---


# Why Test Data Management?


Avoid:


```javascript
await loginPage.login(

    "admin",

    "password123"

);
```


Problems:

- Hardcoded values
- Difficult maintenance
- Environment dependency
- Duplicate data


---


Recommended:


```javascript
const data =

testData.get(

    "ui/login",

    "TC_LOGIN_001"

);


await loginPage.login(

    data.username,

    data.password

);
```


Benefits:

- Reusable
- Maintainable
- Environment independent


---


# Test Data Architecture


```
Test Case


     |


TestDataManager


     |


Data Loader


     |


Environment Folder


     |


JSON / CSV / Excel
```


---


# Framework Components


Location:


```
framework/

    data/
```


Components:


```
TestDataManager.js

JsonDataLoader.js

CsvDataLoader.js

ExcelDataLoader.js
```


---


# Responsibilities


## TestDataManager.js


Main entry point.


Responsible for:


- Loading test data
- Environment detection
- Project detection
- Data caching
- Providing test records


---


## JsonDataLoader.js


Handles:


```
.json
```


files.


---


## CsvDataLoader.js


Handles:


```
.csv
```


files.


---


## ExcelDataLoader.js


Handles:


```
.xlsx
```


files.


---


# Project Test Data Location


Each project owns its data.


Example:


```
Projects/


 knowledgeware/


      test-data/
```


---


# Environment Based Structure


Example:


```
test-data/


    qa/


        ui/


            login.json


            users.json


        api/


            user-api.json



    uat/


        ui/


            login.json


        api/


            user-api.json
```


---


# Environment Isolation


QA execution:


```bash
--env=qa
```


Automatically reads:


```
test-data/

    qa/
```


---


UAT execution:


```bash
--env=uat
```


Automatically reads:


```
test-data/

    uat/
```


No code changes required.


---


# JSON Test Data


File:


```
test-data/

    qa/

        ui/

          login.json
```


Example:


```json
{
    "TC_LOGIN_001": {


        "username":

        "admin",


        "password":

        "admin123",


        "expectedMessage":

        "Login Successful"

    },


    "TC_LOGIN_002": {


        "username":

        "invalid",


        "password":

        "wrong"


    }
}
```


---


# Reading JSON Data


Example:


```javascript
const data =

testData.get(

    "ui/login",

    "TC_LOGIN_001"

);
```


Returns:


```javascript
{
    username:"admin",

    password:"admin123"
}
```


---


# Usage In Test


Example:


```javascript
test(

"Verify valid login",

async ({pageManager,testData})=>{


const loginData =

    testData.get(

        "ui/login",

        "TC_LOGIN_001"

    );


await pageManager

    .loginPage()

    .login(

        loginData.username,

        loginData.password

    );


});
```


---


# CSV Test Data


Example:


File:


```
test-data/

 qa/

   ui/

     users.csv
```


Content:


```csv
id,username,password

TC01,admin,password123

TC02,user,user123
```


---


# Reading CSV


```javascript
const data =

testData.get(

    "ui/users",

    "TC01"

);
```


---


# Excel Test Data


Supported format:


```
.xlsx
```


Example:


```
test-data/

 qa/

   ui/

     users.xlsx
```


---


# Excel Structure


Sheet:


Users


| TestCase | Username | Password |
|---|---|---|
| TC01 | admin | pass123 |
| TC02 | user | pass456 |


---


# Data Loading Lifecycle


During execution:


```
npm command


      |


global-setup


      |


TestDataManager.initialize()


      |


Load Environment Data


      |


Cache Data


      |


Provide To Tests
```


---


# Data Caching


Framework avoids repeated file reading.


First call:


```
Read File

     |

Store Cache
```


Next call:


```
Return Cached Data
```


Benefits:


- Faster execution
- Better performance
- Parallel friendly


---


# UI And API Separation


Recommended:


```
test-data/


 qa/


    ui/


        login.json


        registration.json



    api/


        user.json


        payment.json
```


Benefits:


- Clean organization
- Easy ownership
- Large project support


---


# Multiple Project Example


```
Projects/


 banking/


      test-data/


 ecommerce/


      test-data/
```


Each project owns independent data.


---


# Data Driven Testing


Example:


Multiple users:


```json
{
 "USERS":[


    {

     "username":"admin"


    },


    {

     "username":"manager"


    }

 ]
}
```


Test:


```javascript
for(
const user of data.USERS
){

    await login(

        user.username

    );

}
```


---


# Adding New Test Data File


Step 1:


Create file:


```
qa/ui/search.json
```


Step 2:


Add:


```json
{
    "TC_SEARCH_001":{


        "keyword":

        "Laptop"

    }
}
```


Step 3:


Use:


```javascript
testData.get(

    "ui/search",

    "TC_SEARCH_001"

);
```


---


# Recommended Naming Standards


## Files


Use:


```
feature-name.json
```


Examples:


```
login.json

checkout.json

fund-transfer.json
```


---


# Test Case IDs


Use:


```
TC_MODULE_NUMBER
```


Examples:


```
TC_LOGIN_001

TC_PAYMENT_002

TC_SEARCH_003
```


---


# Best Practices


Always:


✔ Keep data outside tests

✔ Maintain environment folders

✔ Use meaningful IDs

✔ Separate UI/API data

✔ Avoid duplicate data


---


Avoid:


❌ Hardcoded usernames


❌ Hardcoded URLs


❌ Environment checks inside tests


❌ Large unreadable files


---


# Example Complete Flow


Command:


```bash
npm run test -- --project=knowledgeware --env=qa --browser=chromium --type=ui
```


Framework resolves:


```
Project:

knowledgeware


Environment:

qa


Data:

Projects/

 knowledgeware/

    test-data/

        qa/

          ui/
```


Test requests:


```
ui/login
```


Loads:


```
login.json
```


Returns:


```
TC_LOGIN_001
```


---


# Summary


Test Data Management provides:


✔ Environment independence

✔ Multi project support

✔ JSON support

✔ CSV support

✔ Excel support

✔ Data caching

✔ Clean test design


---

Author:

Mahesh Upadhyay

 Enterprise Automation Framework