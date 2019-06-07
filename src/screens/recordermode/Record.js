import React from 'react';
import PropTypes from 'prop-types';

import {
    View,
    StyleSheet, 
    Text,
    TouchableHighlight,
    PermissionsAndroid,
    Platform,
    AsyncStorage
} from 'react-native';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';

export default class Record extends React.Component {

    static propTypes = {
        addNewFile: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            recordSecs: 0,
            recordTime: '00:00:00',
            filename: 'sample',
            nameCount: 0,
            isRecording: false
        };

        this.audioRecorderPlayer = new AudioRecorderPlayer();
    }

    componentDidMount() {
        AsyncStorage.getItem('nameCount').then(value => {
            if(JSON.parse(value)) {
                this.setState({
                    nameCount: JSON.parse(value),
                    filename: 'sample' + JSON.parse(value)
                });
            }
            else{
                this.setState({
                    nameCount: 0,
                    filename: 'sample0'
                });
            }
        });
    }

    componentWillUnmount() {
        AsyncStorage.setItem('nameCount', JSON.stringify(this.state.nameCount));
    }

    onStartRecord = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Permissions for write access',
                        message: 'Give permission to your storage to write a file',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the camera');
                } else {
                    console.log('permission denied');
                    return;
                }
            } catch (err) {
              console.warn(err);
              return;
            }
        }

        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    {
                        title: 'Permissions for write access',
                        message: 'Give permission to your storage to write a file',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the camera');
                } else {
                    console.log('permission denied');
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }

        const path = 'sdcard/' + this.state.filename + '.mp4';
        const result = await this.audioRecorderPlayer.startRecorder(path);
        this.setState({
            isRecording: true
        });
        this.audioRecorderPlayer.addRecordBackListener((e) => {
            this.setState({
                recordSecs: e.current_position,
                recordTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
            });
            return;
        });
        console.log(result);
    }
      
    onStopRecord = async () => {
        const result = await this.audioRecorderPlayer.stopRecorder();
        this.audioRecorderPlayer.removeRecordBackListener();
        this.setState({
            recordSecs: 0,
            isRecording: false
        });
        this.props.addNewFile(this.state.filename);
        this.setState((prevState, props) => ({
            nameCount: prevState.nameCount + 1,
            filename: 'sample' + (prevState.nameCount + 1)
        }));
        console.log(result);
    }

    render() {
        return (
            <View style={styles.root}>
                <View style={styles.block}>
                    <Text style={styles.timeText}>{ this.state.recordTime }</Text>
                    <Text style={styles.nameText}>{ this.state.filename }</Text>
                </View>
                <View style={styles.buttomRow}>
                    <TouchableHighlight 
                        style={styles.deleteButton}>
                        <Text>D</Text>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        style={styles.recordButton}
                        onPress={this.onStartRecord}>
                        <Text>
                            { this.state.isRecording? 'P': 'R' }
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        style={styles.saveButton}
                        onPress={this.onStopRecord}>
                        <Text>S</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.block}>
                    <Text>Nothing to Show.</Text>
                </View>
                <View style={styles.block}>
                    <Text>Nothing to Show.</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'gray'
    },
    block: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeText: {
        color: 'white',
        fontSize: 32
    },
    nameText: {
        color: 'white',
        fontSize: 24
    },
    buttomRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    recordButton: {
        backgroundColor: 'green',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    saveButton: {
        backgroundColor: 'red',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteButton: {
        backgroundColor: 'red',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
});