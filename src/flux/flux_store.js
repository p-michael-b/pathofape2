//This is the flux store
//It provides context to the child components for state management

import React, {createContext, useReducer} from 'react';
import flux_reducer from './flux_reducer.js'

const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown'];
const color_grid = [];
for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 3; j++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        row.push(color);
    }
    color_grid.push(row);
}



export const StoreContext = createContext();

const randomRow = () => {
    const new_row = [];
    for (let j = 0; j < 3; j++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        new_row.push(color);
    }
    return new_row
}

const randomColumn = () => {
    const new_column = [];
    for (let j = 0; j < 10; j++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        new_column.push(color);
    }
    return new_column
}

const initialState = {
    assets_loaded: false,
    whistle_animation: false,
    page: 'landing',
    view: 'data',
    ape_open: false,
    grid: color_grid,
    moving_direction: null,
    incoming_row: randomRow(),
    incoming_column: randomColumn(),

};

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(flux_reducer, initialState);
    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};
