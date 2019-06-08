import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
    AsyncStorage,
    TouchableOpacity,
    Image,

} from 'react-native';

import {
  Header,
  Icon,
  Left,
  Right,
  Body,
  Container,
  Content,
  Button,
  Title
} from "native-base";

import Record from './Record';
import Play from './Play';


const onplayBtn = require("./assets/RecorderMode/playcontent.png");
const offplayBtn = require("./assets/RecorderMode/play_black.png");
const onreocrdBtn = require("./assets/RecorderMode/recordcontent.png");
const offrecordBtn = require("./assets/RecorderMode/record_black.png");

const styles = StyleSheet.create({
        container: {
            flex: 1
        },
        header: {
          backgroundColor: "#212121"  // 背景色
        },

        switch: {

            backgroundColor: '#484848',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 10,
        },
        content: {
            flex:5,
            backgroundColor: '#484848',
        },
        footer:{
          backgroundColor: "#484848",
          height:24
        }
  });

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
        AsyncStorage.setItem('fileList', JSON.stringify(this.state.fileList)); }



    render() {
        return (
          <Container style={styles.container}>
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
              <Title>Recorder</Title>
            </Body>
            <Right />
          </Header>



            <View style={styles.switch}>

                <View style={{flex: 1, alignItems: 'center',justifyContent: 'center'}}>
                  <TouchableOpacity onPress={this.recordPress} >
                    <Image source={this.state.isRecord ? onreocrdBtn : offrecordBtn}/>
                  </TouchableOpacity>
                </View>

                <View style={{flex: 1, alignItems: 'center',justifyContent: 'center'}}>
                  <TouchableOpacity onPress={this.playPress}>
                    <Image source={this.state.isRecord ? offplayBtn:onplayBtn}/>
                  </TouchableOpacity>
                </View>
              </View>
          <Content style={styles.content}>

                {
                    this.state.isRecord ?
                    <Record addNewFile={this.addNewFile} /> :
                    <Play fileList={this.state.fileList} />
                }

          </Content>
            <View style={styles.footer}>
            <Image source={require('../../../assets/trademark.png')} style={{alignSelf: 'center',justifyContent: 'center'}} />
            </View>
      </Container>
        );
    }
}
