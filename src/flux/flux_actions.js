export const startWhistle = () => ({
    type: 'START_WHISTLE',
});
export const stopWhistle = () => ({
    type: 'STOP_WHISTLE',
});
export const finishPreloading = () => ({
    type: 'FINISH_PRELOAD',
});
export const openApeMenu = () => ({
    type: 'OPEN_APE',
    payload: null
});
export const closeApeMenu= () => ({
    type: 'CLOSE_APE',
    payload: null
});
export const changePage = (page) => ({
    type: 'CHANGE_PAGE',
    payload: page
});
export const changeView = (view) => ({
    type: 'CHANGE_VIEW',
    payload: view
});
export const startMove = (direction) => ({
    type: 'START_MOVE',
    payload: direction
});
export const stopMove = (direction) => ({
    type: 'STOP_MOVE',
    payload: direction
});
