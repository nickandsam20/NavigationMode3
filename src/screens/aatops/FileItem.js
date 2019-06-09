import React from 'react';
import PropTypes from 'prop-types';

import {
    View,
    StyleSheet, 
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

import {
    Right,
    Button,
} from "native-base";

export default class FileItem extends React.Component {

    static propTypes = {
        filename: PropTypes.string.isRequired,
        callPlay: PropTypes.func.isRequired,
        deleteSelf: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.chooseFile = this.chooseFile.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    chooseFile() {
        this.props.callPlay(this.props.filename);
    }
    
    handleDelete() {
        this.props.deleteSelf(this.props.filename);
    }
    
    render() {
        return (
            <View style={styles.root}>
                <TouchableOpacity 
                    style={styles.playButton}
                    onPress={this.chooseFile}>
                    <Text style={styles.fileInfo}>{this.props.filename}</Text>
                </TouchableOpacity>
                <Right style={{flex:4}}>
                    <View style={{flexDirection: 'row'}} >
                        <Button transparent  style={{marginHorizontal:10}}>
                            <Image style={{width:20, height:20}}  source={require("../recordermode/assets/Play/rename.png")}/>
                        </Button>
                        <Button transparent style={{smarginHorizontal:10,marginRight:10,marginLeft:10}}  onPress={this.handleDelete}>
                            <Image style={{width:20, height:20}}  source={require("../recordermode/assets/Play/delete.png")}/>
                        </Button>
                    </View>
                </Right>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#666666',
        flexDirection: 'row',
        marginVertical: 4,
        paddingVertical: 8
    },
    playButton: {
        flex: 4
    },
    fileInfo: {
        color: 'black',
        fontSize: 24,
        marginLeft: 16
    },
    optionButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});