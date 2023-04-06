//React
import React, {useEffect, useRef, useContext} from "react";

//Flux
import {StoreContext} from '../flux/flux_store';
import {startWhistle, stopWhistle} from '../flux/flux_actions';

//styles
import '../styles/landing_view.css';

//assets
import ape_logo from "../images/ape_logo.png";
import ape_animation from "../images/ape_whistle.gif";
import whistle_audio from "../images/audio_whistle.m4a";


function LandingView() {
    const {state, dispatch} = useContext(StoreContext);
    const {assets_loaded, whistle_animation} = state;

    const image_reference = useRef(null)
    const brand_reference = useRef(null)
    const alert_reference = useRef(null)

    let touchEvent = 'ontouchstart' in window ? 'touchend' : 'click';
    const handleShowAnim = (event) => {
        showAnim(event);
    }
    const showAnim = () => {
        if (!whistle_animation) {
            dispatch(startWhistle());
            //dispatching the event may  cause the image_reference and whistle_animation cause to get out of sync
            image_reference.current.removeEventListener(touchEvent, handleShowAnim)
            setTimeout(() => {
                dispatch(stopWhistle());
            }, 4390);
        }
    }


    useEffect(() => {
        if (assets_loaded) {
            image_reference.current.addEventListener(touchEvent, handleShowAnim)
        }
    }, [assets_loaded]);

    useEffect(() => {
        const whistle_sound = new Audio()
        if (whistle_animation) {
            brand_reference.current.querySelectorAll(".ape_face").forEach((element) => {
                element.classList.add('flipped');
            });
            whistle_sound.src = whistle_audio;
            whistle_sound.play();
        } else {
            image_reference.current.addEventListener(touchEvent, handleShowAnim)
            brand_reference.current.querySelectorAll(".ape_face").forEach((element) => {
                element.classList.remove("flipped");
            });

            whistle_sound.pause();
            whistle_sound.currentTime = 0;
        }
        return () => {
            if (image_reference.current) {
                image_reference.current.removeEventListener(touchEvent, handleShowAnim);
            }
        };
    }, [whistle_animation]);



    const readApe = () => {
        return (<img
                id="teaser_image"
                className="teaser_image"
                ref={image_reference}
                alt='apebase logo'
                src={whistle_animation ? ape_animation : ape_logo}
            ></img>
        );
    }

    const readBrand = () => {
        return <div
            id='brand'
            className='brand'
            ref={brand_reference}
        >
            <span className='ape_face' style={{"--delay": 1}}>a</span>
            <span className='ape_face' style={{"--delay": 2}}>p</span>
            <span className='ape_face' style={{"--delay": 3}}>e</span>
            <span className='ape_face' style={{"--delay": 4}}>b</span>
            <span className='ape_face' style={{"--delay": 5}}>a</span>
            <span className='ape_face' style={{"--delay": 6}}>s</span>
            <span className='ape_face' style={{"--delay": 7}}>e</span>
        </div>
    }

    const readAlert = () => {
        return <div
            id='alert'
            className='alert_fadein'
            ref={alert_reference}
        >
            COMING SOON!
        </div>
    }

    return (<div id='view'
                 className='view'
    >
        {readApe()}
        {readBrand()}
        {readAlert()}
    </div>)
}

export default LandingView;