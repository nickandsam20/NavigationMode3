import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
    AsyncStorage,
    TouchableOpacity,
    Image
} from 'react-native';


import Record from './Record';
import Play from './Play';


const onplayBtn = require("./assets/RecorderMode/play_blue_line.png");
const offplayBtn = require("./assets/RecorderMode/play_black.png");
const onreocrdBtn = require("./assets/RecorderMode/record_blue_line.png");
const offrecordBtn = require("./assets/RecorderMode/record_black.png");

export default class RecorderMode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            isRecord: true
        };

        this.recordPress = this.recordPress.bind(this);
        this.playPress = this.playPress.bind(this);
        this.addNewFile = this.addNewFile.bind(this);
    }

    componentDidMount() {
        AsyncStorage.getItem('fileList').then(value => {
            if(JSON.parse(value)){
                this.setState({
                    fileList: JSON.parse(value)
                });
            }
            else{
                this.setState({
                    fileList: []
                });
            }
        });
    }

    componentWillUnmount() {
        AsyncStorage.setItem('fileList', JSON.stringify(this.state.fileList));
    }

    recordPress() {
        this.setState({
            isRecord: true
        });
    }

    playPress() {
        this.setState({
            isRecord: false
        });
    }

    addNewFile(filename) {
        this.setState((prevState, props) => ({
            fileList: [...prevState.fileList, filename]
        }));
        AsyncStorage.setItem('fileList', JSON.stringify(this.state.fileList));
    }

    render() {
        return (
            <View style={styles.root}>
                <View style={styles.menuBar}></View>
                <View style={styles.rpBar}>


                <View style={{flex: 1, alignItems: 'center',justifyContent: 'center', marginLeft: 20}}>
                  <TouchableOpacity onPress={this.recordPress} >
                    <Image source={this.state.isRecord ? onreocrdBtn : offrecordBtn}/>
                  </TouchableOpacity>
                </View>

                <View style={{flex: 1, alignItems: 'center',justifyContent: 'center', marginRight:20 }}>
                  <TouchableOpacity onPress={this.playPress}>
                    <Image source={this.state.isRecord ? offplayBtn:onplayBtn}/>
                  </TouchableOpacity>
                </View>
                </View>
                <View style={styles.content}>
                {
                    this.state.isRecord ?
                    <Record addNewFile={this.addNewFile} /> :
                    <Play fileList={this.state.fileList} />
                }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    menuBar: {
        flex: 1,
        backgroundColor: '#212121'
    },
    rpBar: {
        flex: 1,
        backgroundColor: '#484848',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        flex: 6,
        backgroundColor: '#484848'
    }

});
