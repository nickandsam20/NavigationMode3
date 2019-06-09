import React, { Component } from "react";
import { TouchableOpacity, StyleSheet,Image,View } from 'react-native';
import {
  Thumbnail,
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Badge,
  Text,
  Left,
  Right,
  Body,
  Footer,
  Item,
  Input
} from "native-base";

import VerticalSlider from 'rn-vertical-slider'
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

//import styles from "./styles";
const styles=StyleSheet.create({
  container: {
    backgroundColor: "#484848",
    flex:1,
  },
  header: {
    backgroundColor: "#212121",
  },
  content:{
    flex:1
  },
   box1:{
     flex:1
   },
   box2:{
     flex:2
   },
   box3:{

   },
  mb: {
    marginBottom: 10
  },

  buttonon: {
  margin: 10,
  backgroundColor: '#33d9e1',
  borderRadius: 5,
  alignItems: 'center',
  justifyContent: 'center',
  height: 28,
  width: 45
},

buttonoff: {
margin: 10,
backgroundColor: '#fff',
borderRadius: 5,
alignItems: 'center',
justifyContent: 'center',
height: 28,
width: 45
},

  buttonText: {
  color: '#000000',
  fontSize: 16,
  fontWeight: 'bold',
},
  footer:{
    backgroundColor: "#484848",
    height:24

  },
});
const logo = require("../../../assets/record.png");
const start = require("../../../assets/MasterMode/start.png");
const stop = require("../../../assets/MasterMode/stop.png");
const listen = require("../../../assets/MasterMode/hear1.png");
const listenstop= require("../../../assets/MasterMode/hear2.png");
const connected= require("../../../assets/MasterMode/wifi_connect.png");
const unconnected= require("../../../assets/MasterMode/wifi_unconnect.png");


class Mastermode extends Component {
  constructor(props) {
      super(props);
      this.state = { iconName: logo, volumn: 0, record:start, onrecord: false,
      connection:false, connectBtn:connected,
      Track1on:false,Track2on:false,Track3on:false,
      hearT1:false,hearT2:false,hearT3:false,
      hearT1Btn:listen,hearT2Btn:listen,hearT3Btn:listen,
      isPlaying:false,
      counter:0,
      min: 0,
      sec: 0
    };
      this.audioRecorderPlayer = new AudioRecorderPlayer();
      this.onStartRecord = this.onStartRecord.bind(this);
      this.onStopRecord = this.onStopRecord.bind(this);
      this.onStartPlay=this. onStartPlay.bind(this);
      this.onPausePlay=this. onPausePlay.bind(this);
      this.timer = null;
    }


  count = () => {
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
      min: Math.floor((prevState.counter + 1) / 60) % 60,
      sec: (prevState.counter + 1) % 60,
    }));
  }

    onStartRecord() {
      this.timer = setInterval(this.count, 1000);
    }

    onStopRecord() {
      clearInterval(this.timer);
    }

  // onStartPlay() {
  //    console.log('start-play');
  // }
  onStartPlay() {
      console.log('onStartPlay');
      const path = 'sdcard/Sample10.mp4';
      this.audioRecorderPlayer.setVolume(1);
      const msg = this.audioRecorderPlayer.startPlayer(path);
      console.log(msg);
      this.setState({
          isPlaying: true
      });
  }

  // onPausePlay() {
  //    console.log('pause-play');
  // }
  onPausePlay() {
    this.audioRecorderPlayer.pausePlayer();
    this.setState({
        isPlaying: false
    });

  }

  render() {
    console.log('now', this.state.volumn);
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
            <Title>Master</Title>
          </Body>
          <Right />
        </Header>

 <Content padder>
     <View style={{flex: 1, flexDirection: 'row'}}>
        <Button style={{flex: 2,alignSelf: 'center',justifyContent: 'center'}}
          transparent
          onPress={ (onrecord) =>{
            console.log("press");
            if(this.state.onrecord){
              this.onStopRecord();
              this.props.screenProps.all_stop()

            }
            else {
              this.onStartRecord();
              this.props.screenProps.all_start()
            }
          this.state.onrecord ?(this.setState({onrecord:false,record:start})) :
          (this.setState({onrecord:true,record:stop}));



        }}>
          <Thumbnail square source={this.state.record} style={{marginBottom: 10,width:50}} />
        </Button>
    <View style={{flex: 5}}>
    <Text style ={{fontSize:50, color:'#ffff',bold:true,height:60}}>
    {this.state.min >= 10 ? this.state.min : '0'+this.state.min}:{this.state.sec >= 10 ? this.state.sec : '0'+this.state.sec}:00
    </Text>

    <Item style={{width:180}}>
                <Input placeholder="Type Title Here"
                 onChangeText={val => this.setState({ user: val })}
                 style={{marginBottom:-10, fontSize:20, color:'#ffff',height:42}}
                />
    </Item>
    </View>
    </View>

  <View style={{flex: 5, flexDirection: 'row',justifyContent: 'center',alignSelf:'center',paddingVertical: 15}} >

  <View style={{flex:1,marginLeft: 30}}>
    <View>
    <View style={{flexDirection: 'row'}} >
    <Image style={{alignSelf: 'center'}} source={this.state.connectBtn} />

     <TouchableOpacity style={ this.state.Track1on ? styles.buttonon: styles.buttonoff}
     onPress={(Track1on) =>{ this.state.Track1on ?
       (this.setState({Track1on:false})) :
       (this.setState({Track1on:true}))
   }}>
        <Text style={styles.buttonText}> 1 </Text>
     </TouchableOpacity>
     </View>
          <View style= {{alignSelf: 'center',marginVertical: 5}}>
          <VerticalSlider
          value={0}
          disabled={false}
          min={0}
          max={99}
          onChange={(value1) => {
            console.log('CHANGE', value1);
            this.setState({volumn: value1 });
          }}
          onComplete={(value1) => {
            console.log("COMPLETE", value1);
          }}
          width={15}
          height={220}
          step={1}
          borderRadius={2}
          minimumTrackTintColor={"#33d9e1"}
          maximumTrackTintColor={"#212121"}
          showBallIndicator
          ballIndicatorColor={"#484848"}
          ballIndicatorTextColor={"#33d9e1"}
          ballIndicatorWidth={30}
          ballIndicatorPosition={-35}
        /></View>
    <Button style={{margin:10,alignSelf: 'center'}}
          transparent
          onPress={ (hearT1) =>{ this.state.hearT1 ? (this.setState({hearT1:false,hearT1Btn:listen})) : (this.setState({hearT1:true,hearT1Btn:listenstop}));

          this.state.isPlaying ? this.onPausePlay() : this.onStartPlay();
        }

        }>
          <Thumbnail square small source={this.state.hearT1Btn} style={{marginBottom: 10}} />
        </Button>
    </View>
  </View>

<View style={{flex:1}}>
  <View>
    <View style={{flexDirection: 'row'}} >
    <Image style={{alignSelf: 'center'}} source={this.state.connectBtn} />

    <TouchableOpacity style={ this.state.Track2on ? styles.buttonon: styles.buttonoff}
        onPress={(Track2on) =>{ this.state.Track2on ?
          (this.setState({Track2on:false})) :
          (this.setState({Track2on:true}))
      }}>
           <Text style={styles.buttonText}> 2 </Text>
        </TouchableOpacity>
      </View>
    <View style= {{alignSelf: 'center',marginVertical: 5}}>
    <VerticalSlider
        value={0}
        disabled={false}
        min={0}
        max={99}
        onChange={(value2) => {
          console.log('CHANGE', value2);
          this.setState({volumn: value2 });
        }}
        onComplete={(value2) => {
          console.log("COMPLETE", value2);
        }}
        width={15}
        height={220}
        step={1}
        borderRadius={2}
        minimumTrackTintColor={"#33d9e1"}
        maximumTrackTintColor={"#212121"}
        showBallIndicator
        ballIndicatorColor={'#484848'}
        ballIndicatorTextColor={"#33d9e1"}
        ballIndicatorWidth={30}
        ballIndicatorPosition={-35}
      /></View>
      <Button style={{marginTop:10,alignSelf: 'center'}}
        transparent
        onPress={ (hearT2) =>{ this.state.hearT2 ?
        (this.setState({hearT2:false,hearT2Btn:listen})) :
        (this.setState({hearT2:true,hearT2Btn:listenstop}))
      }}>
        <Thumbnail square small source={this.state.hearT2Btn} style={{marginBottom: 10 }} />
      </Button>
   </View>
</View>

<View style={{flex:1}}>
    <View>
      <View style={{flexDirection: 'row'}} >
      <Image style={{alignSelf: 'center'}} source={this.state.connectBtn} />

      <TouchableOpacity style={ this.state.Track3on ? styles.buttonon: styles.buttonoff}
          onPress={(Track3on) =>{ this.state.Track3on ?
            (this.setState({Track3on:false})) :
            (this.setState({Track3on:true}))
        }}>
             <Text style={styles.buttonText}> 3 </Text>
          </TouchableOpacity>
      </View>
    <View style= {{alignSelf: 'center',marginVertical: 5}}>
    <VerticalSlider
      value={0}
      disabled={false}
      min={0}
      max={99}
      onChange={(value2) => {
        console.log('CHANGE', value2);
        this.setState({volumn: value2 });
      }}
      onComplete={(value2) => {
        console.log("COMPLETE", value2);
      }}
      width={15}
      height={220}
      step={1}
      borderRadius={2}
      minimumTrackTintColor={"#33d9e1"}
      maximumTrackTintColor={"#212121"}
      showBallIndicator
      ballIndicatorColor={"#484848"}
      ballIndicatorTextColor={"#33d9e1"}
      ballIndicatorWidth={30}
      ballIndicatorPosition={-35}
      /></View>
      <Button  style={{margin:10,alignSelf: 'center'}}
        transparent
        onPress={ (hearT3) =>{ this.state.hearT3 ?
        (this.setState({hearT3:false,hearT3Btn:listen})) :
        (this.setState({hearT3:true,hearT3Btn:listenstop}))
      }}>
        <Thumbnail square small source={this.state.hearT3Btn} style={{marginBottom: 10}} />
      </Button>

  </View>
  </View>
  </View>
        </Content>
        <Footer  style={styles.footer}>
        <Image source={require('../../../assets/trademark.png')} style={{alignItems: 'center'}} />
        </Footer>
</Container>
    );


  }
}



export default Mastermode;
