export const handleTouchEnd = (event, handler, index) => {
    //Mobile hack
    event.preventDefault();
    if (event.type === 'touchend') {
        handler(event, index);
    }
};

export const handleMouseClick = (event, handler, index) => {
    if (event.type === 'click') {
        handler(event, index);
    }
};