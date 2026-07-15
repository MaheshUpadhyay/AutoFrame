// Projects/project1/fixtures/testFixture.js


import { test as base }
from "@playwright/test";


import { pageFixture }
from "./pageFixture.js";


/**
 * Enterprise Automation Test Fixture
 */


export const test = base.extend({


    app: async({page}, use, testInfo)=>{


        const context =
            await pageFixture.initialize(
                page,
                testInfo
            );


        await use(context);



        await pageFixture.cleanup(
            page,
            testInfo
        );

    }


});


export { expect }
from "@playwright/test";