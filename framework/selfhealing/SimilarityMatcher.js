/**
 * ================================================================
 * Automated Script Enterprise Automation Framework
 * ------------------------------------------------
 * Module  : Self Healing
 * File    : SimilarityMatcher.js
 * Purpose : Finds closest matching element using similarity scoring
 * Purpose of this class:

Compare old locator snapshot with current DOM candidates
Calculate confidence score
Identify best matching element
Used by SelfHealingEngine during fallback stage

Matching strategy:

Priority scoring:

id              HIGH
name            HIGH
aria-label      MEDIUM
placeholder     MEDIUM
text            MEDIUM
class           LOW
tag             LOW
 *
 * Author  : Mahesh Upadhyay
 * ================================================================
 */


/**
 * Provides similarity matching utilities
 * for self healing locator recovery.
 *
 * @class SimilarityMatcher
 */
export class SimilarityMatcher {


    /**
     * Attribute weight configuration.
     *
     * Higher weight means stronger locator identity.
     */
    static ATTRIBUTE_WEIGHTS = {

        id: 0.30,

        name: 0.25,

        placeholder: 0.15,

        "aria-label": 0.15,

        text: 0.10,

        class: 0.03,

        tag: 0.02

    };



    /**
     * Finds best matching element from candidates.
     *
     * @param {Object} originalAttributes
     * Existing stored locator attributes
     *
     * @param {Array<Object>} candidates
     * Current DOM element attributes
     *
     * @returns {Object|null}
     */
    static findBestMatch(
        originalAttributes,
        candidates = []
    ){

        let bestMatch = null;

        let highestScore = 0;


        for(const candidate of candidates){


            const score =
                this.calculateScore(
                    originalAttributes,
                    candidate.attributes
                );


            if(score > highestScore){

                highestScore = score;


                bestMatch = {

                    locator:
                        candidate.locator,

                    attributes:
                        candidate.attributes,

                    confidence:
                        score

                };
            }
        }


        return bestMatch;
    }




    /**
     * Calculates similarity score between two
     * attribute collections.
     *
     * Score range:
     *
     * 0 = no match
     * 1 = exact match
     *
     * @param {Object} source
     * @param {Object} target
     *
     * @returns {number}
     */
    static calculateScore(
        source = {},
        target = {}
    ){

        let finalScore = 0;


        for(const attribute
            of Object.keys(this.ATTRIBUTE_WEIGHTS)){


            const sourceValue =
                source[attribute];


            const targetValue =
                target[attribute];


            if(
                !sourceValue ||
                !targetValue
            ){
                continue;
            }


            const similarity =
                this.compareText(
                    sourceValue,
                    targetValue
                );


            finalScore +=
                similarity *
                this.ATTRIBUTE_WEIGHTS[attribute];

        }


        return Number(
            finalScore.toFixed(2)
        );
    }




    /**
     * Compares two strings and returns similarity.
     *
     * Uses normalized Levenshtein distance.
     *
     * @param {string} first
     * @param {string} second
     *
     * @returns {number}
     */
    static compareText(
        first,
        second
    ){

        first =
            String(first)
                .toLowerCase()
                .trim();


        second =
            String(second)
                .toLowerCase()
                .trim();


        if(first === second){

            return 1;
        }


        const distance =
            this.levenshteinDistance(
                first,
                second
            );


        const maxLength =
            Math.max(
                first.length,
                second.length
            );


        return (
            1 -
            distance / maxLength
        );
    }




    /**
     * Calculates Levenshtein distance.
     *
     * Example:
     *
     * username
     * user_name
     *
     * returns small distance
     *
     * @param {string} first
     * @param {string} second
     *
     * @returns {number}
     */
    static levenshteinDistance(
        first,
        second
    ){


        const matrix = [];


        for(
            let i = 0;
            i <= second.length;
            i++
        ){

            matrix[i] = [i];

        }


        for(
            let j = 0;
            j <= first.length;
            j++
        ){

            matrix[0][j] = j;

        }



        for(
            let i = 1;
            i <= second.length;
            i++
        ){


            for(
                let j = 1;
                j <= first.length;
                j++
            ){


                if(
                    second.charAt(i - 1)
                    ===
                    first.charAt(j - 1)
                ){

                    matrix[i][j] =
                        matrix[i - 1][j - 1];

                }
                else{

                    matrix[i][j] =
                        Math.min(

                            matrix[i - 1][j - 1] + 1,

                            matrix[i][j - 1] + 1,

                            matrix[i - 1][j] + 1

                        );
                }
            }
        }


        return matrix
            [second.length]
            [first.length];
    }

}