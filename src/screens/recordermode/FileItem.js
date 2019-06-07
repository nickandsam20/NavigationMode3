import React from 'react';
import PropTypes from 'prop-types';

import {
    View,
    StyleSheet, 
    Text,
    TouchableHighlight
} from 'react-native';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';

export default class FileItem extends React.Component {

    static propTypes = {
        filename: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            currentPositionSec: 0,
            currentDurationSec: 0,
            playTime: '00:00:00',
            duration: '00:00:00',
            isPlaying: false
        };

        this.audioRecorderPlayer = new AudioRecorderPlayer();
    }
      
    onStartPlay = async () => {
        console.log('onStartPlay');
        const path = 'sdcard/' + this.props.filename + '.mp4';
        const msg = await this.audioRecorderPlayer.startPlayer(path);
        console.log(msg);
        this.setState({
            isPlaying: true
        });
        this.audioRecorderPlayer.addPlayBackListener((e) => {
            if (e.current_position === e.duration) {
                console.log('finished');
                this.audioRecorderPlayer.stopPlayer();
            }
            this.setState({
                currentPositionSec: e.current_position,
                currentDurationSec: e.duration,
                playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
                duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
            });
            return;
        });
    }
      
    onPausePlay = async () => {
        await this.audioRecorderPlayer.pausePlayer();
        this.setState({
            isPlaying: false
        });
    }
      
    onStopPlay = async () => {
        console.log('onStopPlay');
        this.audioRecorderPlayer.stopPlayer();
        this.audioRecorderPlayer.removePlayBackListener();
        this.setState({
            isPlaying: false
        });
    }

    render() {
        return (
            <View style={styles.root}>
                <TouchableHighlight 
                    style={styles.playButton}
                    onPress={ this.state.isPlaying ? this.onPausePlay : this.onStartPlay }>
                    <Text>{ this.state.isPlaying ? 'p' : 'P' }</Text>
                </TouchableHighlight>
                <Text style={styles.fileInfo}>{ this.props.filename }</Text>
                <TouchableHighlight 
                    style={styles.optionButton}>
                    <Text>M</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    playButton: {
        flex: 1,
        backgroundColor: 'green',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fileInfo: {
        flex: 4,
        color: 'black',
        fontSize: 24
    },
    optionButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});