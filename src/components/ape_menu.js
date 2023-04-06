//React
import React, {useContext, useEffect} from "react";
import ReactDOM from "react-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

//Flux
import {StoreContext} from '../flux/flux_store';
import {closeApeMenu, changePage} from '../flux/flux_actions';

//Helpers
import {handleMouseClick, handleTouchEnd} from '../helpers/helpers';

//Fontawesome
import {faCampground, faCoins, faTableCells, faUserAstronaut, faXmark} from '@fortawesome/free-solid-svg-icons'

//styles
import '../styles/ape_menu.css';

const ApeMenu = () => {
    const portal_root = document.getElementById("root");
    const element = document.createElement("div");
    const {state, dispatch} = useContext(StoreContext);
    const {ape_open} = state;

    const clickOutside = (event) => {
        const modal_content = document.getElementById("modal_content");
        if (!modal_content.contains(event.target)) {
           closeApe();
        }
    };

    const closeApe = () => {
        dispatch(closeApeMenu());
    };

    const routePage = (event, index) => {
        let route;
        switch (index) {
            case (0):
                route = 'base';
                break;
            case (1) :
                route = 'stakes';
                break;
            case (2) :
                route = 'data';
                break;
            case (3) :
                route = 'ape';
                break;
            default:
                route = 'landing';
        }
        dispatch(changePage(route))
    };
    const renderMenuItem = (label, menu_icon, index) => {
        return <div
            id='menu_item'
            className='menu_item'
            onClick={(event) => handleMouseClick(event, routePage, index)}
            onTouchEnd={(event) => handleTouchEnd(event, routePage, index)}
        >
            <FontAwesomeIcon
                id='menu_icon'
                className='menu_icon'
                icon={menu_icon}
                size='xl'
            />
            <div
                id='menu_label'
                className='menu_label'
            >
                {label}
            </div>
        </div>
    };
    const renderApeMenu = () => {
        return (
                <div
                    id="menu_modal"
                    className={`menu_modal ${ape_open ? 'menu_modal--open' : ''}`}
                    onClick={(event) => handleMouseClick(event, clickOutside)}
                    onTouchEnd={(event) => handleTouchEnd(event, clickOutside)}
                >
                    <div
                        id="modal_content"
                        className={`modal_content ${ape_open ? 'modal_content--open' : ''}`}
                    >
                             {renderMenuItem('base', faCampground, 0)}
                             {renderMenuItem('stakes', faCoins, 1)}
                             {renderMenuItem('data', faTableCells, 2)}
                             {renderMenuItem('ape', faUserAstronaut, 3)}
                        <FontAwesomeIcon
                            id="cancel_icon"
                            className="cancel_icon"
                            icon={faXmark}
                            size='xl'
                            onClick={(event) => handleMouseClick(event, closeApe)}
                            onTouchEnd={(event) => handleTouchEnd(event, closeApe)}
                        />
                    </div>
                </div>
        );
    };

    useEffect(() => {
        portal_root.appendChild(element);
        return () => {
            portal_root.removeChild(element);
        };
    }, [element, portal_root]);

    return ReactDOM.createPortal(renderApeMenu(), element);
};

export default ApeMenu;
