/*Folder Structure
project
│
├── framework
│     └── data
│            TestDataManager.js
│
└── testdata
      login.json
      users.json
      employee.json
      orders.json
Example login.json
{
  "admin": {
    "username": "admin",
    "password": "admin123"
  },
  "manager": {
    "username": "manager",
    "password": "manager123"
  }
}
Usage
Load complete file
const loginData = TestDataManager.load("login");

await loginPage.login(
    loginData.admin.username,
    loginData.admin.password
);
Read nested property
const username = TestDataManager.get(
    "login",
    "admin.username"
);

const password = TestDataManager.get(
    "login",
    "admin.password"
);
Reload a file
TestDataManager.reload("login");
Clear cache
TestDataManager.clearCache();

//jsondataloader.js
Example registration:

import { testData } from "./framework/data/TestDataManager.js";
import { JsonDataLoader } from "./framework/data/JsonDataLoader.js";

testData.registerLoader(
    "json",
    new JsonDataLoader()
);

Then simply use:

const login = testData.load("login");

const username = testData.get(
    "login",
    "admin.username"
);

//excel dataloader.js
Installation
npm install xlsx
Register with TestDataManager
import { testData } from "./framework/data/TestDataManager.js";
import { ExcelDataLoader } from "./framework/data/ExcelDataLoader.js";

testData.registerLoader("xlsx", new ExcelDataLoader());
testData.registerLoader("xls", new ExcelDataLoader());
Example Usage
const users = testData.load("users.xlsx");

or directly:

const loader = new ExcelDataLoader();

const employees = loader.load(
    "testdata/employees.xlsx",
    "Employees"
);

//csv dataloader.js
Example Registration
import { testData } from "./framework/data/TestDataManager.js";
import { CsvDataLoader } from "./framework/data/CsvDataLoader.js";

testData.registerLoader(
    "csv",
    new CsvDataLoader()
);
Example Usage
const employees = testData.load("employees.csv");

console.log(employees[0].name);
console.log(employees[0].role);*/