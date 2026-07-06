//Browser Fixture Example Usage

//Instead of importing Playwright directly:

import { test, expect } from "@playwright/test";

Use:

import { test, expect } from "../framework/fixtures/browserFixture.js";
test("Login", async ({ page }) => {

    await page.goto("https://example.com");

});

//Page Fixture Example Usage


//instead of

test("Employee", async ({ employeePage }) => {

    await employeePage.search("John");

});

//You'll write

import { test } from "../framework/fixtures/pageFixture.js";

test("Employee Search", async ({ pages }) => {

    await pages.employee().search("John");

});

//or

await pages.login().login();

await pages.dashboard().openEmployees();

await pages.employee().search("John");

//pageManager Example Usage
//Example Usage
import { test } from "../framework/fixtures/pageFixture.js";

test("Login Test", async ({ pages }) => {

    await pages.login().navigate("/login");

    await pages.login().login(
        "admin",
        "password"
    );

});

//Or:

await pages.dashboard().openEmployees();

await pages.employee().search("John");
//I recommend making it generic so you never have to modify PageManager every time you add a new page.