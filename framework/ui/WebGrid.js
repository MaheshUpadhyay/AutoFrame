/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 * ----------------------------------------------------------------------------
 * Module  : Elements
 * File    : WebGrid.js
 * Purpose : Enterprise Grid wrapper with Self Healing support
 *
 * Supports:
 *
 * - AG Grid
 * - PrimeNG Table
 * - Material Table
 * - Kendo Grid
 * - DevExpress Grid
 * - Syncfusion Grid
 *
 * Author  : Mahesh Upadhyay
 * ============================================================================
 */


import { expect }
    from "@playwright/test";


import { BaseElement }
    from "../core/BaseElement.js";


export class WebGrid extends BaseElement {


    /**
     * Creates Grid element.
     *
     * @param {Page} page
     * @param {string} selector
     * @param {string} description
     */
    constructor(
        page,
        selector,
        description = "Grid"
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
    // Internal Helpers
    // ============================================================


    async getRows(){


        const grid =
            await this.getLocator();


        return grid.locator(
            "[role='row']"
        );

    }




    async getColumns(){


        const grid =
            await this.getLocator();


        return grid.locator(
            "[role='columnheader']"
        );

    }




    async getCells(){


        const grid =
            await this.getLocator();


        return grid.locator(
            "[role='gridcell']"
        );

    }





    // ============================================================
    // Grid Information
    // ============================================================


    async getRowCount(){


        const rows =
            await this.getRows();


        return await rows.count();

    }





    async getColumnCount(){


        const columns =
            await this.getColumns();


        return await columns.count();

    }





    async getHeaders(){


        const columns =
            await this.getColumns();


        return await columns.allInnerTexts();

    }





    async isEmpty(){


        return (

            await this.getRowCount()

        ) === 0;

    }






    // ============================================================
    // Cell Operations
    // ============================================================


    async getCell(
        row,
        column
    ){


        const rows =
            await this.getRows();



        return rows

            .nth(row - 1)

            .locator(
                "[role='gridcell']"
            )

            .nth(column - 1);

    }






    async getCellText(
        row,
        column
    ){


        const cell =
            await this.getCell(
                row,
                column
            );


        return (

            await cell.innerText()

        ).trim();

    }






    async clickCell(
        row,
        column
    ){


        const cell =
            await this.getCell(
                row,
                column
            );


        await cell.click();

    }






    async doubleClickCell(
        row,
        column
    ){


        const cell =
            await this.getCell(
                row,
                column
            );


        await cell.dblclick();

    }







    async editCell(
        row,
        column,
        value
    ){


        const cell =
            await this.getCell(
                row,
                column
            );


        await cell.dblclick();


        await cell.fill(
            String(value)
        );


        await cell.press(
            "Enter"
        );

    }








    // ============================================================
    // Row Operations
    // ============================================================


    async selectRow(row){


        const rows =
            await this.getRows();


        await rows
            .nth(row - 1)
            .click();

    }






    async getRowValues(row){


        const rows =
            await this.getRows();


        return await rows

            .nth(row - 1)

            .locator(
                "[role='gridcell']"
            )

            .allInnerTexts();

    }







    async findRow(text){


        const rows =
            await this.getRows();


        const count =
            await rows.count();



        for(
            let i = 0;
            i < count;
            i++
        ){


            const row =
                rows.nth(i);



            if(
                (
                    await row.innerText()
                )
                .includes(text)
            ){

                return row;

            }

        }



        return null;

    }








    // ============================================================
    // Sorting
    // ============================================================


    async sortAscending(columnName){


        const grid =
            await this.getLocator();



        await grid

            .getByRole(
                "columnheader",
                {
                    name:
                        columnName
                }
            )

            .click();

    }







    async sortDescending(columnName){


        const grid =
            await this.getLocator();



        await grid

            .getByRole(
                "columnheader",
                {
                    name:
                        columnName
                }
            )

            .dblclick();

    }








    // ============================================================
    // Filtering
    // ============================================================


    async filter(
        columnName,
        value
    ){


        const grid =
            await this.getLocator();


        const filter =
            grid.getByPlaceholder(

                `Filter ${columnName}`

            );



        await filter.fill(
            value
        );

    }








    // ============================================================
    // Enterprise Helpers
    // ============================================================


    async containsText(text){


        return (

            await this.findRow(text)

        ) !== null;

    }






    async getGridData(){


        const rows =
            await this.getRowCount();


        const data = [];



        for(
            let i = 1;
            i <= rows;
            i++
        ){

            data.push(

                await this.getRowValues(i)

            );

        }



        return data;

    }








    // ============================================================
    // Assertions
    // ============================================================


    async verifyRowCount(expected){


        expect(

            await this.getRowCount()

        ).toBe(expected);

    }






    async verifyColumnCount(expected){


        expect(

            await this.getColumnCount()

        ).toBe(expected);

    }







    async verifyCellText(
        row,
        column,
        expected
    ){


        expect(

            await this.getCellText(
                row,
                column
            )

        ).toBe(expected);

    }







    async verifyContainsText(text){


        expect(

            await this.containsText(text)

        ).toBeTruthy();

    }

}
/*
This is an important one because it supports enterprise grids like:

AG Grid
PrimeNG Table
Material Table
Kendo Grid
DevExpress Grid
Syncfusion Grid*/