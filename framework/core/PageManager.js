/**
 * ============================================================================
 * Enterprise Automation Framework
 * PageManager
 * ----------------------------------------------------------------------------
 * Centralized Page Object Manager.
 *
 * Responsibilities
 * ----------------
 * • Lazy initialization of Page Objects
 * • Reuse page instances
 * • Single access point for all pages
 * • Project independent page registry
 *
 * Author : Automated Script
 * ============================================================================
 */


export class PageManager {


    #page;

    #pages = new Map();



    /**
     * Constructor
     *
     * @param {import("@playwright/test").Page} page
     */

    constructor(page){


        if(!page){

            throw new Error(
                "Page cannot be null."
            );

        }


        this.#page = page;

    }






    /**
     * Get Playwright page instance
     *
     * Useful for dynamic registration
     *
     * @returns {Page}
     */

    getPage(){

        return this.#page;

    }






    /**
     * Register Page Object
     *
     * @param {string} key
     * @param {Function} factory
     */


    register(key, factory){


        if(
            !this.#pages.has(key)
        ){

            this.#pages.set(
                key,
                factory
            );

        }

    }






    /**
     * Get Page Object
     *
     * Lazy creates object only once
     *
     * @param {string} key
     */


    get(key){


        if(
            !this.#pages.has(key)
        ){

            throw new Error(
                `Page not registered : ${key}`
            );

        }



        let pageObject =
            this.#pages.get(key);



        /**
         * Lazy initialization
         */

        if(
            typeof pageObject === "function"
        ){


            pageObject =
                pageObject();


            this.#pages.set(
                key,
                pageObject
            );

        }



        return pageObject;

    }







    /**
     * Clears cached pages
     */


    clear(){

        this.#pages.clear();

    }







    /**
     * Check page exists
     *
     * @param {string} key
     */

    has(key){

        return this.#pages.has(key);

    }







    /**
     * Count registered pages
     */

    count(){

        return this.#pages.size;

    }



}