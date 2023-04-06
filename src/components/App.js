//React
import React, {useEffect, useRef, useContext} from 'react';

//Flux
import {StoreContext} from '../flux/flux_store';
import {useAssetLoader} from "../flux/custom_hooks";

//local components
import AppHeader from './app_header.js';
import LandingView from './landing_view.js';
import BaseView from './base_view.js';
import StakeView from './stake_view.js';
import DataView from './data_view.js';
import ApeView from './ape_view.js';

//styles
import '../styles/App.css';

//assets
import ape_mini from "../images/ape_mini.png"
import ape_logo from "../images/ape_logo.png";
import ape_animation from "../images/ape_whistle.gif";
import background_image from '../images/jungle_background.png';
import whistle_audio from "../images/audio_whistle.m4a";


function App() {
    const {state} = useContext(StoreContext);
    const {page, ape_open} = state;
    const assets = [ape_logo, ape_animation, whistle_audio, ape_mini, background_image]
    const assets_loaded = useAssetLoader(assets);
    const bg_reference = useRef(null)
    useEffect(() => {
        if (bg_reference.current) {
            if (ape_open) {
                bg_reference.current.classList.remove("sharpened");
                bg_reference.current.classList.add("blurred");
            } else {
                bg_reference.current.classList.remove("blurred");
                bg_reference.current.classList.add("sharpened");
            }
        }
    }, [ape_open]);

    const renderView = () => {
        switch (page) {
            case ('landing'):
                return <LandingView/>
            case ('base'):
                return <BaseView/>
            case ('stakes') :
                return <StakeView/>
            case ('data') :
                return <DataView/>
            case ('ape') :
                return <ApeView/>
            default:
                return <LandingView
                />
        }
    }

    const renderApp = () => {
        return assets_loaded && <div
            id='background'
            className='background'
            ref={bg_reference}
            style={{backgroundImage: `url(${background_image})`}}
        >
            <AppHeader/>
            {renderView()}
        </div>
    }

    return renderApp();
}

export default App;
