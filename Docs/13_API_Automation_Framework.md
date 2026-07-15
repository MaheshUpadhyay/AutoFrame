# API Automation Framework

## Enterprise Automation Framework

**Author:** Mahesh Upadhyay

---

# 1. Overview

The API Automation Framework provides an enterprise-grade REST API testing layer built on top of Playwright APIRequestContext.

The framework hides direct Playwright API usage and provides reusable components for:

- HTTP execution
- Request handling
- Response handling
- Authentication
- Headers
- Logging
- Retry mechanism
- Assertions
- JSON schema validation
- Allure reporting


---

# 2. API Architecture


## Request Flow


```text

API Test

    |

ApiClient

    |

ApiRequest

    |

ApiHeaders

    |

ApiAuthentication

    |

ApiRetryHandler

    |

Playwright APIRequestContext

    |

ApiResponse

    |

ApiAssertions

    |

ApiSchemaValidator

    |

Allure Report

```

---

# 3. Framework Structure


```text

framework/

 api/

    core/

        ApiClient.js
        ApiRequest.js
        ApiResponse.js


    headers/

        ApiHeaders.js


    auth/

        ApiAuthentication.js


    logging/

        ApiLogger.js


    retry/

        ApiRetryHandler.js


    assertions/

        ApiAssertions.js


    schema/

        ApiSchemaValidator.js

```

---

# 4. Project API Structure


Example:

```text

Projects/

 knowledgeware/

    tests/

        api/

            users.test.js


    test-data/

        qa/

            api/

                users.json


    schemas/

        api/

            users/

                get-user.schema.json

```

---

# 5. API Configuration


Environment:

```text

Projects/knowledgeware/config/qa.json

```

Example:


```json
{
    "api": {

        "baseUrl":
        "https://jsonplaceholder.typicode.com",


        "timeout":
        30000,


        "headers": {

            "Content-Type":
            "application/json",


            "Accept":
            "application/json"

        },


        "retry": {

            "enabled":
            true,


            "count":
            2,


            "delay":
            1000

        }

    }
}

```

---

# 6. ApiClient Usage


Tests should only use:

```javascript

ApiClient

```


Never use:

```javascript

request.get()

```


Example:


```javascript

const response =

    await ApiClient.get(

        "/users/1"

    );

```

---

# 7. Supported HTTP Methods


## GET


```javascript

await ApiClient.get(

    "/users"

);

```


## POST


```javascript

await ApiClient.post(

    "/users",


    {

        name:

        "Mahesh"

    }

);

```


## PUT


```javascript

await ApiClient.put(

    "/users/1",

    body

);

```


## PATCH


```javascript

await ApiClient.patch(

    "/users/1",

    body

);

```


## DELETE


```javascript

await ApiClient.delete(

    "/users/1"

);

```

---

# 8. Headers Management


Default headers are loaded from:

```text

qa.json

```


Runtime headers:


```javascript

await ApiClient.get(

    "/users",

    {

        headers:

        {

            "client":

            "automation"

        }

    }

);

```

---

# 9. Authentication Support


Supported:


- Bearer Token
- Basic Authentication
- API Key


Example:


```javascript

ApiAuthentication.bearerToken(

    token

);

```


Generated:


```json

{
    "Authorization":

    "Bearer token-value"
}

```

---

# 10. API Assertions


Import:


```javascript

import { ApiAssertions }

from "./ApiAssertions.js";

```


Status:


```javascript

ApiAssertions.shouldHaveStatus(

    response,

    200

);

```


Field validation:


```javascript

await ApiAssertions.shouldHaveField(

    response,

    "id"

);

```


Response time:


```javascript

ApiAssertions.shouldRespondWithin(

    response,

    2000

);

```

---

# 11. Test Data Usage


Example:


```json

{

 "TC_GET_USER_001":

 {

    "endpoint":

    "/users/1",


    "expectedStatus":

    200

 }

}

```


Usage:


```javascript

const data =

    testData.get(

        "api/users",

        "TC_GET_USER_001"

    );

```

---

# 12. JSON Schema Validation


Schema:


```text

schemas/api/users/get-user.schema.json

```


Usage:


```javascript

await ApiSchemaValidator.validateResponseFile(

    response,

    schemaPath

);

```

---

# 13. Retry Mechanism


Configured using:


```json

"retry":

{

    "enabled": true,

    "count":2

}

```


Automatically retries:


- 500
- 502
- 503
- 504
- Network failures


No retry code required inside tests.

---

# 14. API Logging


Automatically logs:


Request:


```text

METHOD

URL

HEADERS

BODY

```


Response:


```text

STATUS

HEADERS

BODY

EXECUTION TIME

```

---

# 15. Allure API Reporting


Every API test automatically attaches:


```text

API Request

    Method
    URL
    Headers
    Body


API Response

    Status
    Headers
    Body
    Execution Time

```

---

# 16. Execution


Run only API tests:


```bash

npm run test -- --project=knowledgeware --env=qa --type=api

```


Output:


```text

Running 1 test


[api]

users.test.js


PASSED

```

---

# 17. Best Practices


DO:

✔ Use ApiClient

✔ Store test data externally

✔ Validate schemas

✔ Use ConfigManager

✔ Use ApiAssertions


DON'T:

❌ Use Playwright request directly

❌ Hardcode URLs

❌ Put tokens inside tests

❌ Duplicate headers

---

# API Automation Implementation Completed













Enterprise Automation Framework now supports:

- UI Automation
- API Automation
- Data Driven Testing
- Reporting
- Self Healing
- Enterprise Execution
