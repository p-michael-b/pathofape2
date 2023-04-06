import {useContext, useEffect} from 'react';
import { StoreContext } from '../flux/flux_store';
import { finishPreloading } from '../flux/flux_actions';

function useAssetLoader(assets) {
    const { state, dispatch } = useContext(StoreContext);
    const {assets_loaded} = state;

    useEffect(() => {
        let load_counter = 0;
        const total_count = assets.length;

        function onAssetLoad() {
            load_counter++;
            if (load_counter === total_count) {
                dispatch(finishPreloading());
            }
        }

        assets.forEach(url => {
            if (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png') || url.endsWith('.gif')) {
                const image = new Image();
                image.onload = onAssetLoad;
                image.onerror = () => {
                    console.error('Failed to load image:', url);
                }
                image.src = url;
            } else if (url.endsWith('.mp3') || url.endsWith('.wav') || url.endsWith('.ogg') || url.endsWith('.m4a')) {
                const audio = new Audio();
                audio.oncanplaythrough = onAssetLoad;
                audio.onerror = () => {
                    console.error('Failed to load audio:', url);
                }
                audio.src = url;
            }
        });
    }, []);

    return assets_loaded
}

export { useAssetLoader };