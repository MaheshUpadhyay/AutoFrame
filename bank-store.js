/* =========================================================
   BANK STORE - one source of truth for the training bank
   ---------------------------------------------------------
   Everything lives in sessionStorage (per tab, cleared on
   logout), exactly like the rest of the app:

     beneficiaries  - the payee list (Beneficiary Management)
     transfers      - every completed or scheduled transfer

   Used by: dashboard, accounts-statements, beneficiary-mgt,
   fund-transfer.
========================================================= */
(function () {
    const OPENING_BALANCE = 75400;          // Savings XXXX1234
    const COOL_OFF_MS = 30 * 60 * 1000;     // new payee approval wait

    function read(key, fallback) {
        try {
            const v = JSON.parse(sessionStorage.getItem(key));
            return v === null ? fallback : v;
        } catch (e) {
            return fallback;
        }
    }

    function write(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    /* ---------------- BENEFICIARIES ---------------- */
    function defaultBeneficiaries() {
        const now = Date.now();
        return [
            { name: "Self Savings", account: "123456789012", bank: "AutomatedScript Bank", addedAt: now - (60 * 60 * 1000), status: "Active" },
            { name: "John", account: "987654321098", bank: "AutomatedScript Bank", addedAt: now - (45 * 60 * 1000), status: "Active" },
            { name: "Raj", account: "456789123456", bank: "HDFC Bank", addedAt: now - (10 * 60 * 1000), status: "Pending Approval" }
        ];
    }

    // Seeds the three defaults on first use, as the page always did.
    function getBeneficiaries() {
        if (!sessionStorage.getItem("beneficiaries")) {
            write("beneficiaries", defaultBeneficiaries());
        }
        return read("beneficiaries", []);
    }

    // Without seeding: null when Beneficiary Management was never opened.
    function peekBeneficiaries() {
        return read("beneficiaries", null);
    }

    function saveBeneficiaries(list) {
        write("beneficiaries", list);
    }

    // A pending payee becomes Active once the cool-off has passed.
    function effectiveStatus(b) {
        if (b.status === "Pending Approval" && Date.now() - b.addedAt >= COOL_OFF_MS) {
            return "Active";
        }
        return b.status;
    }

    // Deterministic approval (replaces the 1-in-5 random rejection):
    // a payee whose name starts with "Reject" is always Rejected,
    // every other new payee is always Pending Approval.
    function statusForNewPayee(name) {
        return /^reject/i.test(String(name).trim()) ? "Rejected" : "Pending Approval";
    }

    /* ---------------- TRANSFERS ---------------- */
    function today() {
        const d = new Date();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${d.getFullYear()}-${m}-${day}`;
    }

    // A scheduled transfer is debited on its date, not when it is booked.
    function settleDue(list) {
        let changed = false;
        list.forEach(tx => {
            if (tx.status === "Scheduled" && tx.date <= today()) {
                tx.status = "Success";
                changed = true;
            }
        });
        return changed;
    }

    // Newest first.
    function getTransfers() {
        const list = read("transfers", []);
        if (settleDue(list)) write("transfers", list);
        return list;
    }

    function addTransfer(tx) {
        const list = read("transfers", []);
        list.unshift(tx);
        write("transfers", list);
        return tx;
    }

    function total(tx) {
        return Number(tx.amount) + Number(tx.charges || 0);
    }

    // Balance = opening balance minus every settled transfer.
    function getBalance() {
        return getTransfers()
            .filter(tx => tx.status === "Success")
            .reduce((bal, tx) => bal - total(tx), OPENING_BALANCE);
    }

    // Money promised to scheduled transfers that are not yet debited.
    function getHeld() {
        return getTransfers()
            .filter(tx => tx.status === "Scheduled")
            .reduce((sum, tx) => sum + total(tx), 0);
    }

    function formatINR(n) {
        return Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    window.BankStore = {
        OPENING_BALANCE,
        COOL_OFF_MS,
        getBeneficiaries,
        peekBeneficiaries,
        saveBeneficiaries,
        effectiveStatus,
        statusForNewPayee,
        today,
        getTransfers,
        addTransfer,
        total,
        getBalance,
        getHeld,
        formatINR
    };
})();
