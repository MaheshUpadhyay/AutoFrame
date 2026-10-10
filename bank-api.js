/* =========================================================
   BANK API CLIENT - the live AutomatedScript Banking API
   ---------------------------------------------------------
   Used by api-payees.html only. Every call is a real fetch(),
   so it shows in the browser's Network tab and in Playwright
   traces. The token is kept in sessionStorage (per tab):

     apiToken   - the bearer access token (30 minutes)
     apiUser    - { fullName, role, customerId }

   The other bank pages do not use this file; they keep their
   data in sessionStorage (js/bank-store.js).
========================================================= */
(function () {
    const BASE = "https://automatedscript-banking-api.onrender.com";
    const API_KEY = "test-api-key-123";   // the playground's published demo key

    async function call(method, path, body, withToken = true) {
        const headers = { "x-api-key": API_KEY };
        if (body !== undefined) headers["Content-Type"] = "application/json";
        const token = sessionStorage.getItem("apiToken");
        if (withToken && token) headers["Authorization"] = "Bearer " + token;

        const res = await fetch(BASE + path, {
            method,
            headers,
            body: body === undefined ? undefined : JSON.stringify(body)
        });
        let data = null;
        if (res.status !== 204) {
            try { data = await res.json(); } catch (e) { data = null; }
        }
        if (!res.ok) {
            const message = (data && data.message) || ("Request failed: " + res.status);
            const err = new Error(message);
            err.status = res.status;
            throw err;
        }
        return data;
    }

    window.BankApi = {
        BASE,
        login: (username, password) =>
            call("POST", "/auth/login", { username, password }, false),
        verifyOtp: (otpSessionId, otp) =>
            call("POST", "/auth/verify-otp", { otpSessionId, otp }, false),
        accounts: () => call("GET", "/accounts"),
        beneficiaries: () => call("GET", "/beneficiaries"),
        addBeneficiary: (b) => call("POST", "/beneficiaries", b),
        deleteBeneficiary: (id) => call("DELETE", "/beneficiaries/" + encodeURIComponent(id)),

        saveSession(verify) {
            sessionStorage.setItem("apiToken", verify.accessToken);
            sessionStorage.setItem("apiUser", JSON.stringify({
                fullName: verify.fullName,
                role: verify.role,
                customerId: verify.customerId
            }));
        },
        clearSession() {
            sessionStorage.removeItem("apiToken");
            sessionStorage.removeItem("apiUser");
        },
        signedIn: () => !!sessionStorage.getItem("apiToken"),
        user() {
            try { return JSON.parse(sessionStorage.getItem("apiUser")); } catch (e) { return null; }
        }
    };
})();
