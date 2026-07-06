/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 * ----------------------------------------------------------------------------
 * Module  : Elements
 * File    : WebTree.js
 * Purpose : Enterprise Tree wrapper with Self Healing support
 *
 * Supports:
 *
 * - ARIA Tree
 * - PrimeNG Tree
 * - Material Tree
 * - Kendo TreeView
 * - jsTree
 * - Custom Tree Components
 *
 * Author  : Mahesh Upadhyay
 * ============================================================================
 */


import { expect }
    from "@playwright/test";


import { BaseElement }
    from "../core/BaseElement.js";


/**
 * Enterprise Tree Element.
 *
 * @class WebTree
 */
export class WebTree extends BaseElement {


    /**
     * Creates Tree element.
     *
     * @param {Page} page
     * @param {string} selector
     * @param {string} description
     */
    constructor(
        page,
        selector,
        description = "Tree"
    ){

        super(

            page.locator(selector),

            description,

            {
                page,

                selector
            }

        );

    }




    // ============================================================
    // Node Helpers
    // ============================================================


    /**
     * Returns tree node by text.
     *
     * @param {string} text
     */
    async getNode(text){


        const tree =
            await this.getLocator();


        return tree.getByRole(

            "treeitem",

            {
                name:text
            }

        );

    }





    // ============================================================
    // Expand / Collapse
    // ============================================================


    async expand(text){


        const node =
            await this.getNode(text);


        const expanded =
            await node.getAttribute(
                "aria-expanded"
            );



        if(expanded === "false"){

            await node.click();

        }

    }






    async collapse(text){


        const node =
            await this.getNode(text);


        const expanded =
            await node.getAttribute(
                "aria-expanded"
            );



        if(expanded === "true"){

            await node.click();

        }

    }






    async toggle(text){


        const node =
            await this.getNode(text);


        await node.click();

    }






    // ============================================================
    // Selection
    // ============================================================


    async select(text){


        const node =
            await this.getNode(text);


        await node.click();

    }






    async doubleClick(text){


        const node =
            await this.getNode(text);


        await node.dblclick();

    }







    async rightClick(text){


        const node =
            await this.getNode(text);


        await node.click({

            button:"right"

        });

    }







    // ============================================================
    // Information
    // ============================================================


    async containsNode(text){


        const node =
            await this.getNode(text);


        return (

            await node.count()

        ) > 0;

    }







    async getNodeCount(){


        const tree =
            await this.getLocator();


        return await tree

            .getByRole("treeitem")

            .count();

    }







    async getNodes(){


        const tree =
            await this.getLocator();


        return await tree

            .getByRole("treeitem")

            .allInnerTexts();

    }








    async isExpanded(text){


        const node =
            await this.getNode(text);


        return (

            await node.getAttribute(

                "aria-expanded"

            )

        ) === "true";

    }








    async isSelected(text){


        const node =
            await this.getNode(text);


        return (

            await node.getAttribute(

                "aria-selected"

            )

        ) === "true";

    }







    // ============================================================
    // Wait Methods
    // ============================================================


    async waitUntilExpanded(
        text,
        timeout = 30000
    ){


        const node =
            await this.getNode(text);



        await expect(node)

            .toHaveAttribute(

                "aria-expanded",

                "true",

                {
                    timeout
                }

            );

    }








    async waitUntilSelected(
        text,
        timeout = 30000
    ){


        const node =
            await this.getNode(text);



        await expect(node)

            .toHaveAttribute(

                "aria-selected",

                "true",

                {
                    timeout
                }

            );

    }







    // ============================================================
    // Enterprise Helpers
    // ============================================================


    async expandAll(){


        const nodes =
            await this.getNodes();



        for(
            const node
            of nodes
        ){

            await this.expand(node);

        }

    }







    async collapseAll(){


        const nodes =
            await this.getNodes();



        for(
            const node
            of nodes
        ){

            await this.collapse(node);

        }

    }








    // ============================================================
    // Assertions
    // ============================================================


    async verifyNodeExists(text){


        expect(

            await this.containsNode(text)

        ).toBe(true);

    }







    async verifySelected(text){


        expect(

            await this.isSelected(text)

        ).toBe(true);

    }








    async verifyExpanded(text){


        expect(

            await this.isExpanded(text)

        ).toBe(true);

    }

}
/*
This component is already designed for enterprise tree controls:

ARIA Tree
PrimeNG Tree
Material Tree
Kendo TreeView
jsTree
Custom Tree Components*/