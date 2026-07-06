export class ExcelDataLoader {


    /**
     * Load Excel file
     *
     * @param {string} filePath
     * @returns {object[]}
     */
    async load(filePath){


        const workbook =
            new ExcelJS.Workbook();


        await workbook.xlsx.readFile(
            filePath
        );


        const worksheet =
            workbook.worksheets[0];


        if(!worksheet){


            throw new Error(

                `No worksheet found : ${filePath}`

            );


        }


        const headers = [];


        worksheet

            .getRow(1)

            .eachCell(

                cell => {

                    headers.push(

                        cell.value

                    );

                }

            );



        const rows = [];



        worksheet.eachRow(

            (row,rowNumber)=>{


                if(rowNumber === 1){

                    return;

                }


                const data = {};


                row.eachCell(

                    (cell,index)=>{


                        data[
                            headers[index - 1]
                        ] = cell.value;


                    }

                );


                rows.push(data);


            }

        );


        return rows;


    }


}