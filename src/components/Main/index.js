import React from 'react';
import {View, StyleSheet} from 'react-native';

import {audioClips, audioTypes} from '../../audioSource';
import {loadPrefs, resetPrefs} from '../../prefs';
import * as globalState from '../../globalState';

import Loader from '../Loader';
import Home from '../Home';
import Scan from '../Scan';
import ScanResult from '../ScanResult';
import Shop from '../Shop';
import TopMenu from '../TopMenu';
import BotMenu from '../BotMenu';

export default class Main extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            isInitialized: false,
            curViewIndex: 0
        };

        globalState.set_ToggleLoader(this.toggleLoader);
        globalState.set_SetViewIndex(this.setViewIndex);
    }

    componentDidMount() {
        this.loadAudioClips();
    }

    loadAudioClips = () => {
        this.toggleLoader(true);
        audioClips.loadAllAudio()
            .then(() => {
                this.loadPlayerPrefs();
            })
            .catch(e => {
                this.loadPlayerPrefs();
                console.log(`Error: ${JSON.stringify(e)}`);
            });
    }

    loadPlayerPrefs = () => {
        loadPrefs(() => {
            this.finalizeInit();
        });
    };

    finalizeInit = () => {
        this.playGreetAudio();
        this.toggleLoader(false);

        this.setState({
            isInitialized: true
        });
    };

    playGreetAudio = () => {
        audioClips.playAudio(
            audioTypes.BGM.getKeyAt(0)
        );
        audioClips.playAudio(audioTypes.Greet.getRandomKey());
    }

    toggleLoader = (isEnabled) => {
        this.setState({
            isLoading: isEnabled
        });
    };

    setViewIndex = (index) => {
        this.setState({
            curViewIndex: index
        });
    };

    renderMainViews() {
        let viewInx = this.state.curViewIndex;
        return (
            <View style={StyleSheet.absoluteFill}>
                { viewInx === 0 && <Home /> }
                { viewInx === 2 && <ScanResult /> }
                { viewInx === 3 && <Shop /> }

                <TopMenu/>
                <BotMenu/>

                { viewInx === 1 && <Scan /> }
            </View>
        );
    }

    render() {
        return(
            <View style={StyleSheet.absoluteFill}>
                { this.state.isInitialized && this.renderMainViews() }
                { this.state.isLoading && <Loader /> }
            </View>
        );
    }
}
