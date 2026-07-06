/**
 * ============================================================================
 * Enterprise Automation Framework
 * ReportManager
 * ----------------------------------------------------------------------------
 * Public reporting API for the automation framework.
 *
 * All tests, page objects and framework classes should interact with
 * ReportManager instead of Allure directly.
 *
 * Author : Automated Script
 * ============================================================================
 */

import { AllureManager } from "./AllureManager.js";

export class ReportManager {

    // ============================================================
    // Suite Information
    // ============================================================

    static async parentSuite(name) {

        await AllureManager.addLabel(
            "parentSuite",
            name
        );

    }

    static async suite(name) {

        await AllureManager.addLabel(
            "suite",
            name
        );

    }

    static async subSuite(name) {

        await AllureManager.addLabel(
            "subSuite",
            name
        );

    }

    // ============================================================
    // Metadata
    // ============================================================

    static async epic(name) {

        await AllureManager.addEpic(name);

    }

    static async feature(name) {

        await AllureManager.addFeature(name);

    }

    static async story(name) {

        await AllureManager.addStory(name);

    }

    static async owner(name) {

        await AllureManager.addOwner(name);

    }

    static async severity(level) {

        await AllureManager.addSeverity(level);

    }

    static async tag(name) {

        await AllureManager.addTag(name);

    }

    // ============================================================
    // Description
    // ============================================================

    static async description(text) {

        await AllureManager.addDescription(text);

    }

    static async descriptionHtml(html) {

        await AllureManager.addDescriptionHtml(html);

    }

    // ============================================================
    // Parameters
    // ============================================================

    static async parameter(name, value) {

        await AllureManager.addParameter(
            name,
            value
        );

    }

    // ============================================================
    // Links
    // ============================================================

    static async issue(issueId) {

        await AllureManager.addIssue(issueId);

    }

    static async tms(testCaseId) {

        await AllureManager.addTms(testCaseId);

    }

    static async link(url, name = url) {

        await AllureManager.addLink(
            url,
            name
        );

    }

    // ============================================================
    // Attachments
    // ============================================================

    static async attachText(name, text) {

        await AllureManager.addTextAttachment(
            name,
            text
        );

    }

    static async attachJson(name, object) {

        await AllureManager.addJsonAttachment(
            name,
            object
        );

    }

    static async attachFile(
        name,
        file,
        contentType
    ) {

        await AllureManager.addAttachment(
            name,
            file,
            contentType
        );

    }

}