import React from 'react';
import {
    View,
    Text,
    ListView,
    StyleSheet,
    AsyncStorage
} from 'react-native';

import {
  Header,
  Icon,
  Left,
  Right,
  Body,
  Container,
  Button,
  Title
} from "native-base";

import FileItem from './FileItem';
import FilePlay from './FilePlay';

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
})

export default class PlayMode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: ds.cloneWithRows([]),
            fileChoose: '',
            isChosen: false
        };
        
        this.callPlay = this.callPlay.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
        this.rerender = this.rerender.bind(this);
        this.getNewName = this.getNewName.bind(this);
    }

    componentDidMount() {
        AsyncStorage.getItem('fileList').then(value => {
            if(JSON.parse(value)){
                this.setState({
                    dataSource: ds.cloneWithRows(JSON.parse(value))
                });
            }
            else{
                this.setState({
                    dataSource: ds.cloneWithRows([])
                });
            }
        });
    }

    callPlay(filename) {
        this.setState({
            fileChoose: filename,
            isChosen: true
        });
    }

    async getNewName(newFilename, oldFileName) {
        console.log(newFilename, oldFileName);
        var newItems = [];
        //var newItems_ = [];
        await AsyncStorage.getItem('fileList').then(value => {
            newItems = JSON.parse(value);
        });
        newItems = newItems.map((event) => {
            event = event === oldFileName ? newFilename : event;
            return event;
        });
        AsyncStorage.setItem('fileList', JSON.stringify(newItems));
        //this.rerender();
        this.setState({
            dataSource: ds.cloneWithRows(newItems)
        });
        console.log("HERE");

        // if(this.state.fileChoose === filename){
        //     this.setState({
        //         fileChoose: '',
        //         isChosen: false
        //     });
        // }
    }

    async rerender() {
        console.log("HERE%");
        var newItems = [];
        //var newItems_ = [];
        await AsyncStorage.getItem('fileList').then(value => {
            newItems = JSON.parse(value);
        });
        console.log(newItems);
        this.setState({
            dataSource: ds.cloneWithRows(newItems)
        });
        console.log("HERE3");
    }

    async deleteFile(filename) {
        var items = [];
        await AsyncStorage.getItem('fileList').then(value => {
            items = JSON.parse(value);
        });
        items = items.filter(function(element) {
            return element !== filename;
        });
        AsyncStorage.setItem('fileList', JSON.stringify(items));
        this.setState({
            dataSource: ds.cloneWithRows(items)
        });
        console.log("HERE2");
        if(this.state.fileChoose === filename){
            this.setState({
                fileChoose: '',
                isChosen: false
            });
        }
    }

    render() {
        return (
            <Container>
                <Header style={styles.header}>
                    <Left>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.openDrawer()}
                    >
                        <Icon name="menu" />
                    </Button>
                    </Left>
                    <Body>
                    <Title>Play</Title>
                    </Body>
                    <Right />
                </Header>

                <View style={styles.block}>
                    <Text style={styles.category}>Master</Text>
                    <Text style={styles.category}>Recorder</Text>
                    <View style={styles.showList}>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={(rowData) => {
                                return <FileItem filename={rowData} callPlay={this.callPlay} 
                                deleteSelf={this.deleteFile} getNewName={this.getNewName}/>;
                            }}
                        />
                    </View>
                </View>
                <View style={styles.playFunc}>
                {
                    this.state.isChosen ?
                    <FilePlay filename={this.state.fileChoose} /> :
                    <View></View>
                }
                </View>
                
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    header: {
        backgroundColor: '#000000'
    },
    block: {
        flex: 12,
        backgroundColor: '#484848'
    },
    category: {
        fontSize: 20,
        color: 'white',
        marginLeft: 16,
        marginVertical: 8
    },
    showList: {
    },
    playFunc: {
        flex: 2,
        backgroundColor: '#484848'
    }
});
