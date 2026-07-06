//Example Usage APIClient.js
const api = new ApiClient(request);

api.setBaseUrl("https://reqres.in/api");

api.setBearerToken(token);

const response = await api.get("/users/2");
const response = await api.post(
    "/users",
    {
        name: "John",
        job: "QA"
    }
);

//Example Usage RequestBuilder.js
const request = new RequestBuilder()
    .endpoint("/users/{id}")
    .method("GET")
    .path("id", 10)
    .query("expand", "roles")
    .header("Accept", "application/json")
    .build();
const request = new RequestBuilder()
    .endpoint("/users")
    .method("POST")
    .json({
        name: "John",
        job: "QA"
    })
    .build();

//Example Usage ResponseValidator.js
//Simple GET
const api = new ApiClient(request);
const validator = new ResponseValidator();

const response = await api.get("/users/2");

await validator.verifyStatus(response, 200);

await validator.verifySuccess(response);

await validator.verifyContentType(
    response,
    "application/json"
);

await validator.verifyJson(
    response,
    "page",
    2
);
//POST
const response = await api.post(
    "/users",
    {
        name: "John",
        job: "QA"
    }
);

await validator.verifyStatus(response, 201);

await validator.verifyJsonProperty(
    response,
    "id"
);