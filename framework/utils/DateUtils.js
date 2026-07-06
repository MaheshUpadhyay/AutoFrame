/**
 * ============================================================================
 * Enterprise Automation Framework
 * DateUtils
 * ----------------------------------------------------------------------------
 * Common date and time utility methods.
 *
 * Author : Automated Script
 * ============================================================================
 */

export class DateUtils {

    static now() {
        return new Date();
    }

    static today() {
        const d = new Date();
        d.setHours(0,0,0,0);
        return d;
    }

    static addDays(date, days) {
        const d = new Date(date);
        d.setDate(d.getDate() + days);
        return d;
    }

    static addMonths(date, months) {
        const d = new Date(date);
        d.setMonth(d.getMonth() + months);
        return d;
    }

    static addYears(date, years) {
        const d = new Date(date);
        d.setFullYear(d.getFullYear() + years);
        return d;
    }

    static format(date, pattern = "yyyy-MM-dd") {

        const d = new Date(date);

        const yyyy = d.getFullYear();
        const MM = String(d.getMonth()+1).padStart(2,"0");
        const dd = String(d.getDate()).padStart(2,"0");
        const HH = String(d.getHours()).padStart(2,"0");
        const mm = String(d.getMinutes()).padStart(2,"0");
        const ss = String(d.getSeconds()).padStart(2,"0");

        return pattern
            .replace("yyyy", yyyy)
            .replace("MM", MM)
            .replace("dd", dd)
            .replace("HH", HH)
            .replace("mm", mm)
            .replace("ss", ss);
    }

    static toISO(date = new Date()) {
        return new Date(date).toISOString();
    }

    static daysBetween(start, end) {
        const ms = Math.abs(new Date(end) - new Date(start));
        return Math.floor(ms / (1000 * 60 * 60 * 24));
    }

    static isWeekend(date) {
        const day = new Date(date).getDay();
        return day === 0 || day === 6;
    }

    static isWeekday(date) {
        return !this.isWeekend(date);
    }

    static startOfMonth(date) {
        const d = new Date(date);
        return new Date(d.getFullYear(), d.getMonth(), 1);
    }

    static endOfMonth(date) {
        const d = new Date(date);
        return new Date(d.getFullYear(), d.getMonth()+1, 0);
    }

    static timestamp() {
        return Date.now();
    }

    static compare(date1, date2) {
        return new Date(date1).getTime() - new Date(date2).getTime();
    }
}
