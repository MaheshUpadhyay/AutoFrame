//Example Usage dateutils.js
import { DateUtils } from "../framework/utils/DateUtils.js";

const today = DateUtils.today();

const nextWeek = DateUtils.addDays(today, 7);

const formatted = DateUtils.format(
    nextWeek,
    "dd/MM/yyyy"
);

console.log(formatted);

const difference = DateUtils.daysBetween(
    "2026-06-01",
    "2026-06-28"
);

console.log(difference);

//fileutils.js
//Example Usage
import { FileUtils } from "../framework/utils/FileUtils.js";

FileUtils.createDirectory("reports");

FileUtils.writeJson("reports/result.json", {
    status: "PASS",
    executionTime: "12s"
});

const result = FileUtils.readJson("reports/result.json");

console.log(result.status);

FileUtils.copy(
    "reports/result.json",
    "backup/result.json"
);

//jsonutils.js
//Example Usage
import { JsonUtils } from "../framework/utils/JsonUtils.js";

const user = {
    profile: {
        name: "John"
    }
};

const name = JsonUtils.get(user, "profile.name");

JsonUtils.set(user, "profile.city", "Pune");

const updated = JsonUtils.deepMerge(user, {
    profile: {
        role: "Admin"
    }
});

console.log(JsonUtils.pretty(updated));