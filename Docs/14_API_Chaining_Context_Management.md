# API Chaining & Context Management

## Automated Script Enterprise Automation Framework

**Author:** Mahesh Upadhyay

---

# 1. Overview

API Chaining is used when multiple API calls depend on data generated from previous API executions.

Example:

```text
Login API

    |

Generate Token

    |

Create User

    |

Capture User ID

    |

Get User Details

    |

Update User

    |

Delete User
```

The framework provides centralized API context management to share runtime values safely between API steps.

---

# 2. Problem Without Context Management

Avoid storing runtime API values manually.

Example:

❌ Do not use:

```javascript
let token;

let userId;
```

Problems:

- Not scalable
- Hard to maintain
- Parallel execution issues
- Duplicate variables
- Poor reporting visibility

---

# 3. Framework Solution


API Context Store:


```text
framework/

 api/

    context/

        ApiContextStore.js
```


Responsibilities:

- Store runtime API values
- Retrieve values between tests
- Manage tokens
- Manage generated IDs
- Clear execution data


---

# 4. API Context Architecture


```text

API Response

      |

 Extract Value

      |

ApiContextStore.save()

      |

Runtime Memory

      |

Next API

      |

ApiContextStore.get()

```

---

# 5. ApiContextStore Usage


Import:

```javascript
import { ApiContextStore }

from "../../../framework/api/context/ApiContextStore.js";
```

---

# 6. Saving Runtime Values


Example:

Create User API:

```javascript
const response =

    await ApiClient.post(

        "/users",

        requestBody

    );


const body =

    await response.json();


ApiContextStore.save(

    "USER_ID",

    body.id

);
```

Stored:

```text
USER_ID = 101
```

---

# 7. Reading Runtime Values


Example:

Get User API:


```javascript
const userId =

    ApiContextStore.get(

        "USER_ID"

    );


const response =

    await ApiClient.get(

        `/users/${userId}`

    );
```

Runtime execution:

```text
/users/101
```

---

# 8. Authentication Token Chaining


Login API:

```javascript
const response =

    await ApiClient.post(

        "/login",

        credentials

    );


const body =

    await response.json();


ApiContextStore.save(

    "ACCESS_TOKEN",

    body.token

);
```

---

Use token:

```javascript
const token =

    ApiContextStore.get(

        "ACCESS_TOKEN"

    );


ApiAuthentication.bearerToken(

    token

);
```

---

# 9. Complete Workflow Example


```javascript
test(

"Create update delete user workflow",

async()=>{


    const createResponse =

        await ApiClient.post(

            "/users",

            userPayload

        );


    const createBody =

        await createResponse.json();



    ApiContextStore.save(

        "USER_ID",

        createBody.id

    );




    const userId =

        ApiContextStore.get(

            "USER_ID"

        );




    const getResponse =

        await ApiClient.get(

            `/users/${userId}`

        );



    ApiAssertions.shouldHaveStatus(

        getResponse,

        200

    );

});

```

---

# 10. Environment Context


Context values exist only during current execution.


Example:


Execution 1:

```text
USER_ID=100
TOKEN=abc
```


Execution ends:

```text
Context cleared
```


Execution 2:

```text
New empty context
```

---

# 11. Parallel Execution Support


Each worker maintains isolated runtime context.

Safe for:

- Parallel API execution
- CI/CD execution
- Multiple environments

Example:

```bash
npm run test -- --project=knowledgeware --env=qa --type=api
```

---

# 12. Context Naming Standards


Recommended:


Authentication:

```text
ACCESS_TOKEN

REFRESH_TOKEN
```


Users:

```text
USER_ID

USER_EMAIL
```


Orders:

```text
ORDER_ID

PAYMENT_ID
```


Avoid:


```text
id

token

value
```

---

# 13. When To Use Context Store


Use for:


✔ Tokens

✔ Generated IDs

✔ Dynamic reference numbers

✔ Session values

✔ Workflow state


Do not use for:


❌ Static test data

❌ Environment values

❌ Configuration


Use:

```text
ConfigManager
```

instead.

---

# 14. Enterprise API Flow


```text

TestDataManager

        |

        |

ApiClient

        |

        |

ApiResponse

        |

        |

ApiContextStore

        |

        |

Next API Call

        |

        |

ApiAssertions

        |

        |

Allure Report

```

---

# API Context Management Completed

The framework now supports enterprise API workflows:

- Authentication chaining
- Token sharing
- Dynamic ID management
- Multi-step API scenarios
- End-to-end service validation
