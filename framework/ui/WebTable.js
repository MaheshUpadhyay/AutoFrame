/**
 * ============================================================================
 * Automated Script Enterprise Automation Framework
 * ----------------------------------------------------------------------------
 * Module  : Elements
 * File    : WebTable.js
 * Purpose : Enterprise HTML Table wrapper with Self Healing support
 *
 * Provides:
 *
 * - Row operations
 * - Column operations
 * - Cell operations
 * - Searching
 * - Assertions
 * - Self healing locator recovery
 *
 * Author  : Mahesh Upadhyay
 * ============================================================================
 */


import { expect }
    from "@playwright/test";


import { BaseElement }
    from "../core/BaseElement.js";


/**
 * Enterprise Table Element.
 *
 * @class WebTable
 */
export class WebTable extends BaseElement {


    constructor(
        page,
        selector,
        description = "Table"
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
    // Table Information
    // ============================================================


    async getRowCount(){


        const table =
            await this.getLocator();


        return await table
            .locator("tbody tr")
            .count();

    }





    async getColumnCount(){


        const table =
            await this.getLocator();


        return await table
            .locator("thead th")
            .count();

    }






    async getHeaders(){


        const table =
            await this.getLocator();


        return await table
            .locator("thead th")
            .allInnerTexts();

    }






    async isEmpty(){


        return (

            await this.getRowCount()

        ) === 0;

    }







    // ============================================================
    // Cell Information
    // ============================================================


    async getCell(
        row,
        column
    ){


        const table =
            await this.getLocator();


        return table.locator(

            `tbody tr:nth-child(${row}) td:nth-child(${column})`

        );

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







    // ============================================================
    // Row Information
    // ============================================================


    async getRow(row){


        const table =
            await this.getLocator();


        return table.locator(

            `tbody tr:nth-child(${row})`

        );

    }






    async getRowText(row){


        const rowElement =
            await this.getRow(row);


        return (

            await rowElement.innerText()

        ).trim();

    }







    async getRowValues(row){


        const rowElement =
            await this.getRow(row);


        return await rowElement
            .locator("td")
            .allInnerTexts();

    }







    // ============================================================
    // Column Information
    // ============================================================


    async getColumn(column){


        const table =
            await this.getLocator();


        return await table
            .locator(

                `tbody td:nth-child(${column})`

            )
            .allInnerTexts();

    }








    // ============================================================
    // Search Operations
    // ============================================================


    async findRowByText(text){


        const table =
            await this.getLocator();


        const rows =
            table.locator(
                "tbody tr"
            );



        const count =
            await rows.count();




        for(
            let index = 0;
            index < count;
            index++
        ){


            const row =
                rows.nth(index);



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








    async findRowByColumnValue(
        header,
        value
    ){


        const headers =
            await this.getHeaders();


        const index =
            headers.indexOf(header);



        if(index === -1){

            return null;

        }



        const rowCount =
            await this.getRowCount();




        for(
            let row = 1;
            row <= rowCount;
            row++
        ){


            const cellText =
                await this.getCellText(

                    row,

                    index + 1

                );



            if(cellText === value){


                return await this.getRow(
                    row
                );

            }

        }



        return null;

    }







    // ============================================================
    // Extra Enterprise Helpers
    // ============================================================


    async containsText(text){


        return (

            await this.findRowByText(text)

        ) !== null;

    }







    async getTableData(){


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