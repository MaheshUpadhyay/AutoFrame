/**
 * ============================================================================
 * Enterprise Automation Framework
 * Report Constants
 * ----------------------------------------------------------------------------
 *
 * Common reporting constants.
 *
 * Author : Automated Script
 * ============================================================================
 */


/**
 * Allure Severity Levels
 */

export const Severity = {


    BLOCKER : "blocker",


    CRITICAL : "critical",


    NORMAL : "normal",


    MINOR : "minor",


    TRIVIAL : "trivial"


};





/**
 * Attachment Types
 */

export const AttachmentType = {


    TEXT : "text/plain",


    JSON : "application/json",


    HTML : "text/html",


    XML : "application/xml",


    PNG : "image/png",


    VIDEO : "video/webm"


};





/**
 * Report Labels
 */

export const Labels = {


    EPIC:

        "epic",


    FEATURE:

        "feature",


    STORY:

        "story",


    OWNER:

        "owner",


    SEVERITY:

        "severity"


};

/**
 * Combined Constants Export
 *
 * Used by framework managers
 */


export const ReportConstants = {


    Severity,


    AttachmentType,


    Labels


};