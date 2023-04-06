//React
import React, {useContext, useRef} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

//Flux
import {StoreContext} from '../flux/flux_store';
import {openApeMenu, changeView} from '../flux/flux_actions';

//Helpers
import {handleMouseClick, handleTouchEnd} from '../helpers/helpers';

//Fontawesome
import {faMap} from '@fortawesome/free-regular-svg-icons'
import {faCampground, faCoins, faTableCells, faUserAstronaut} from '@fortawesome/free-solid-svg-icons'

//local components
import ApeMenu from './ape_menu.js';

//styles
import '../styles/app_header.css';

//assets
import ape_mini from "../images/ape_mini.png"

function AppHeader() {
    const right_reference = useRef(null)
    const {state, dispatch} = useContext(StoreContext);
    const {page, view, ape_open} = state;

    const handleApeOpen = () => {
        dispatch(openApeMenu());
    };

    const toggleView = () => {
        if (page === 'data') {
            let toggle = view === 'space' ? 'grid' : 'space';
            dispatch(changeView(toggle));
        }
    };
    const readApeIcon = () => {
        return <img
            id='ape_icon'
            className='ape_icon'
            src={ape_mini}
            onClick={(event) => handleMouseClick(event, handleApeOpen)}
            onTouchEnd={(event) => handleTouchEnd(event, handleApeOpen)}
            alt='Apebase Icon'
        />
    }
    const renderMenuModal = () => {
        if (ape_open) {
            return <ApeMenu/>
        }
    }
    const renderLeftHeader = () => {
        return <div
            id='left_header'
            className='left_header'
        >
            {readApeIcon()}
            {renderMenuModal()}
        </div>
    }
    const renderCenterHeader = () => {
        return <div
            id='center_header'
            className='center_header'
        >
            WelCoMe To tHe JuNgLE
        </div>
    };
    const renderRightHeader = () => {
        let icon;
        switch (page) {
            case ('base'):
                icon = faCampground;
                break;
            case ('stakes') :
                icon = faCoins;
                break;
            case ('data') :
                icon = view === 'space' ? faMap : faTableCells;
                break;
            case ('ape') :
                icon = faUserAstronaut;
                break;
            default:
                icon = faCampground;
        }
        if (page !== 'landing') {
            return <div
                id='right_header'
                className='right_header'
                onClick={(event) => handleMouseClick(event, toggleView)}
                onTouchEnd={(event) => handleTouchEnd(event, toggleView)}
            >
                <svg
                    id='view_icon'
                    className='view_icon'
                    ref={right_reference}
                >
                    <FontAwesomeIcon
                        id='right_icon'
                        className='right_icon'
                        icon={icon}
                        size="2xs"
                    />
                </svg>
            </div>
        }
    }

    return (
        <div
            id='header_container'
            className='header_container'
        >
            {renderLeftHeader()}
            {renderCenterHeader()}
            {renderRightHeader()}
        </div>
    );
}

export default AppHeader;