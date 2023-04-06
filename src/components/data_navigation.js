//React
import React, {useEffect, useRef, useContext} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

//Flux
import {StoreContext} from '../flux/flux_store';
import {startMove, stopMove} from "../flux/flux_actions";

//Helpers
import {handleMouseClick, handleTouchEnd} from '../helpers/helpers';

//Fontawesome
import {faArrowUp, faArrowDown, faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';

//styles
import '../styles/data_view.css';

function DataNavigation() {
    const navigation_reference = useRef(null);
    const button_reference = useRef(null);
    const {state, dispatch} = useContext(StoreContext);
    const {grid, moving_direction} = state;

    useEffect(() => {
        if (navigation_reference.current) {
            activateNavButtons()
            return () => {
                deactivateNavButtons()
            };
        }
    }, []);

    useEffect(() => {
        if (moving_direction === null) {
            switchClassChangeNorth('remove')
            switchClassChangeSouth('remove')
            switchClassChangeWest('remove')
            switchClassChangeEast('remove')
            activateNavButtons()
            if (button_reference.current) {
                button_reference.current.classList.remove('ripple_stay')
            }
        } else {
            if (moving_direction === 'north') {
                switchClassChangeNorth('add')
            }
            if (moving_direction === 'south') {
                switchClassChangeSouth('add')
            }
            if (moving_direction === 'west') {
                switchClassChangeWest('add')
            }
            if (moving_direction === 'east') {
                switchClassChangeEast('add')
            }
        }
    }, [moving_direction]);

    const handleClick = (event) => handleMouseClick(event, navigateGrid);
    const handleTouch = (event) => handleTouchEnd(event, navigateGrid);


    const applyClassChangeToElement = (element, method, change) => {
        element.classList[method === 'add' ? 'add' : 'remove'](change);
    }

    //accessing DOM directly is a tradeoff for splitting the data_view into parts. Drilling references seems even dirtier.
    const switchClassChangeNorth = (method) => {
        document.querySelectorAll('.square_row').forEach((element, index) => {
            if (index === 0) {
                applyClassChangeToElement(element, method, 'animate_out_north')
            } else {
                applyClassChangeToElement(element, method, 'animate_up')
            }
        })
        applyClassChangeToElement(document.querySelector('.bottom_row'), method, 'animate_in_south');
    }

    const switchClassChangeSouth = (method) => {
        document.querySelectorAll('.square_row').forEach((element, index) => {
            if (index === grid.length - 1) {
                applyClassChangeToElement(element, method, 'animate_out_south')
            } else {
                applyClassChangeToElement(element, method, 'animate_down')
            }
        })
        applyClassChangeToElement(document.querySelector('.top_row'), method, 'animate_in_north');
    }

    const switchClassChangeWest = (method) => {
        document.querySelectorAll('.square_row').forEach((element) => {
            applyClassChangeToElement(element.childNodes[0], method, 'animate_out_west')
            applyClassChangeToElement(element.childNodes[1], method, 'animate_left')
            applyClassChangeToElement(element.childNodes[2], method, 'animate_left')
        })
        document.querySelectorAll('.right_square').forEach((element) => {
            applyClassChangeToElement(element, method, 'animate_in_east');
        })
    }

    const switchClassChangeEast = (method) => {
        document.querySelectorAll('.square_row').forEach((element) => {
            applyClassChangeToElement(element.childNodes[0], method, 'animate_right')
            applyClassChangeToElement(element.childNodes[1], method, 'animate_right')
            applyClassChangeToElement(element.childNodes[2], method, 'animate_out_east')
        })
        document.querySelectorAll('.left_square').forEach((element) => {
            applyClassChangeToElement(element, method, 'animate_in_west');
        })
    }

    const activateNavButtons = () => {
        if (navigation_reference.current) {
            const buttons = navigation_reference.current.childNodes;
            buttons.forEach((button) => {
                button.addEventListener('click', handleClick);
                button.addEventListener('touchend', handleTouch);
            });
        }
    }
    const deactivateNavButtons = () => {
        if (navigation_reference.current) {
            const buttons = navigation_reference.current.childNodes;
            buttons.forEach((button) => {
                button.removeEventListener('click', handleClick);
                button.removeEventListener('touchend', handleTouch);
            });
        }
    }

    const navigateGrid = (event) => {
        if (!moving_direction) {
            button_reference.current = event.currentTarget;
            button_reference.current.classList.add('ripple_stay')
            switch (parseInt(event.currentTarget.dataset.index)) {
                case (0):
                    dispatch(startMove('north'))
                    deactivateNavButtons()
                    setTimeout(() => {
                        dispatch(stopMove('north'))
                    }, 330);
                    break;
                case (1) :
                    dispatch(startMove('south'))
                    deactivateNavButtons()
                    setTimeout(() => {
                        dispatch(stopMove('south'))
                    }, 330);
                    break;
                case (2) :
                    dispatch(startMove('west'))
                    deactivateNavButtons()
                    setTimeout(() => {
                        dispatch(stopMove('west'))
                    }, 330);
                    break;
                case (3) :
                    dispatch(startMove('east'))
                    deactivateNavButtons()
                    setTimeout(() => {
                        dispatch(stopMove('east'))
                    }, 330);
                    break;
                default:
            }
        }
    };

    const renderButton = (direction, icon, index) => {
        return <div
            className={`floating_button ${direction}`}
            data-index={index}
        >
            <div className="floating_button_bubble">
                <FontAwesomeIcon
                    icon={icon}
                    className='floating_button_icon'
                />
            </div>
        </div>
    }

    return (
        <div
            id='button_container'
            className='button_container'
            ref={navigation_reference}
        >
            {renderButton('north_button', faArrowUp, 0)}
            {renderButton('south_button', faArrowDown, 1)}
            {renderButton('west_button', faArrowLeft, 2)}
            {renderButton('east_button', faArrowRight, 3)}
        </div>
    )
}

export default DataNavigation;