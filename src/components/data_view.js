//React
import React, {useContext} from 'react';

//Flux
import {StoreContext} from '../flux/flux_store';

//local components
import DataNavigation from './data_navigation.js';

//styles
import '../styles/data_view.css';

function DataView() {
    const {state} = useContext(StoreContext);
    const {grid, incoming_row, incoming_column} = state;

    const renderSquareRow = (row, row_index) => {
        return <div
            className="square_row"
            key={row_index}
        >
            {row.map((column, column_index) => (
                renderDataSquare(column, column_index, column)
            ))}
        </div>
    }

    const renderDataSquare = (column, column_index, value) => {
        return <div
            className="data_square"
            key={column_index}
            // style={{backgroundColor: column}}
        >
            {value}
        </div>
    }

    const renderHeader = (value, index) => {
        return <div
            className="header_square"
            key={index}
        >
            {value}
        </div>
    }


    const renderGridHeader = () => {
        const headers= ['First Name', 'Second Name', 'A long address']
        return <div
            id="grid_header"
            className="grid_header"
        >
            {incoming_row.map((column, column_index) => (
                renderHeader(headers[column_index], column_index)
            ))}
        </div>
    }

    const renderGridFooter = () => {
        const headers= ['36 rows selected', '1,399 rows total', 'Selection']
        return <div
            id="grid_footer"
            className="grid_footer"
        >
            {incoming_row.map((column, column_index) => (
                renderHeader(headers[column_index], column_index)
            ))}
        </div>
    }



    const renderTopRow = () => {
        return <div
            id="top_row"
            className="top_row"
        >
            {incoming_row.map((column, column_index) => (
                renderDataSquare(column, column_index, column)
            ))}
        </div>
    }

    const renderCornerSquare = () => {
        return <div
            id="corner_square"
            className="corner_square"
        >
            {renderDataSquare('white', 0)}
        </div>
    }


    const renderBottomRow = () => {
        return <div
            id="bottom_row"
            className="bottom_row"
        >
            {incoming_row.map((column, column_index) => (
                renderDataSquare(column, column_index, column)
            ))}
        </div>
    }


    const renderLeftColumn = () => {
        return <div
            id="left_container"
            className="side_container"
        >
            {renderCornerSquare()}
            <div
                id="left_grid"
                className="side_grid"
            >
                {incoming_column.map((row, row_index) => (
                    renderLeftSquare(row, row_index)
                ))}
            </div>
            {renderCornerSquare()}
        </div>

    }

    const renderRightColumn = () => {
        return <div
            id="right_container"
            className="side_container"
        >
            {renderCornerSquare()}
            <div
                id="right_grid"
                className="side_grid"
            >

                {incoming_column.map((row, row_index) => (
                    renderRightSquare(row,row_index)
                ))}
            </div>
            {renderCornerSquare()}
        </div>
    }


    const renderLeftSquare = (row, index) => {
        return <div
            className="left_square"
            key={index}
            // style={{backgroundColor: row}}
        >
            {row}
        </div>
    }

    const renderRightSquare = (row, index) => {
        return <div
            className="right_square"
            key={index}
            // style={{backgroundColor: row}}
        >
            {row}
        </div>
    }


    const renderDataGrid = () => {
        return <div
            id='grid_container'
            className='grid_container'
        >
            {renderGridHeader()}
            {renderTopRow()}
            {renderGrid()}
            {renderBottomRow()}
            {renderGridFooter()}
        </div>
    }

    const renderGrid = () => {
        return <div
            id='data_grid'
            className='data_grid'
        >

            {grid.map((row, row_index) => (
                renderSquareRow(row, row_index)
            ))}
        <DataNavigation/>
        </div>
    }

    return (
        <div
            id='view'
            className='view'
        >
            <div
                id='view_container'
                className='view_container'
            >
                {renderLeftColumn()}
                {renderDataGrid()}
                {renderRightColumn()}
            </div>
        </div>)
}


export default DataView;