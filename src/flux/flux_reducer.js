//This is the flux reducer
//It takes in current state and an action and returns a new state

const flux_reducer = (state, action) => {
    const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown'];
    const {grid, incoming_row, incoming_column} = state;
    const {type} = action
    let view, page, direction;
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

    const moveGrid = (direction) => {
        let new_grid = [];
        switch (direction) {
            case ('north'):
                //need to make a deep copy here, else the button disablement gets circumvented by the old grid being further and further changed
                new_grid = [...grid].slice(1);
                return [...new_grid, incoming_row];
            case ('south') :
                new_grid = [...grid];
                new_grid.pop();
               return [incoming_row, ...new_grid];
            case ('west') :
                new_grid = [];
                grid.forEach((row, row_index) => {
                    new_grid.push([row[1], row[2], incoming_column[row_index]])
                });
               return [...new_grid];
            case ('east') :
                new_grid = [];
                grid.forEach((row, row_index) => {
                    new_grid.push([incoming_column[row_index], row[0], row[1]])
                });
                return [...new_grid];
        }
    }
    switch (type) {
        case 'START_WHISTLE':
            return {
                ...state,
                whistle_animation: true,
            };
        case 'STOP_WHISTLE':
            return {
                ...state,
                whistle_animation: false,
            };
        case 'FINISH_PRELOAD':
            return {
                ...state,
                assets_loaded: true,
            };
        case 'OPEN_APE':
            return {
                ...state,
                ape_open: true,
            };
        case 'CLOSE_APE':
            return {
                ...state,
                ape_open: false,
            };
        case 'CHANGE_PAGE':
            page = action.payload;
            return {
                ...state,
                page: page,
                view: 'grid',
                ape_open: false
            };
        case 'CHANGE_VIEW':
            view = action.payload;
            return {
                ...state,
                view: view,
            };
        case 'START_MOVE':
            direction = action.payload;
            if (direction === 'north' || direction === 'south') {
                return {
                    ...state,
                    incoming_row: randomRow(),
                    moving_direction: direction,
                };
            } else {
                return {
                    ...state,
                    incoming_column: randomColumn(),
                    moving_direction: direction,
                };
            }
        case 'STOP_MOVE':
            direction = action.payload;
            return {
                ...state,
                moving_direction: null,
                grid: moveGrid(direction),
            };
        default:
            return state;
    }
};

export default flux_reducer;
