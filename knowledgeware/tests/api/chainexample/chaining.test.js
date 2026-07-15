/**
 * @file chaining.test.js
 * @description
 * API Chaining Example
 *
 * @author Mahesh Upadhyay
 */

import { test } from "@playwright/test";

import { ApiClient } from "../../../../../framework/api/core/ApiClient.js";
import { ApiAssertions } from "../../../../../framework/api/assertions/ApiAssertions.js";
import { ApiAuthentication } from "../../../../../framework/api/auth/ApiAuthentication.js";
import { ApiContextStore } from "../../../../../framework/api/context/ApiContextStore.js";
import { testData } from "../../../../../framework/data/TestDataManager.js";
import { ReportManager } from "../../../../../framework/reporting/ReportManager.js";

test.describe("API Chaining", () => {

    test(
        "TC_API_CHAIN_001 - Access Token -> Get User",
        async () => {

            await ReportManager.epic("API Automation");
            await ReportManager.feature("API Chaining");

            const data = testData.get(
                "api/chaining",
                "TC_API_CHAIN_001"
            );

            // STEP 1 - Get Access Token
            const tokenResponse =
                await ApiClient.get(
                    data.tokenEndpoint
                );

            ApiAssertions.shouldHaveStatus(
                tokenResponse,
                data.expectedStatus
            );

            const tokenBody =
                await tokenResponse.json();

            console.log(tokenBody);

            // TODO:
            // Replace "accessToken" with the actual field returned by your API
            const accessToken =
                tokenBody.accessToken;

            ApiContextStore.save(
                "ACCESS_TOKEN",
                accessToken
            );

            // STEP 2 - Configure Bearer Authentication
            ApiAuthentication.bearerToken(
                ApiContextStore.get("ACCESS_TOKEN")
            );

            // STEP 3 - Call Protected API
            const userResponse =
                await ApiClient.get(
                    data.userEndpoint
                );

            ApiAssertions.shouldHaveStatus(
                userResponse,
                200
            );

            const user =
                await userResponse.json();

            console.log(user);

        });

});