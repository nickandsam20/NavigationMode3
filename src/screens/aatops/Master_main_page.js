import React ,{Component} from 'react';
import {View,Text} from 'react-native';
import { StyleSheet } from 'react-native';
import { Button,Image } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body ,Right,Icon} from 'native-base';
import No_connected from './No_connected';
import Card_list from './Card_list';
const fontSize1=30;
const fontSize2=20;
const fontSize3=15;
const special_text_color='#33d9e1';
const styles=StyleSheet.create({
    background_view:{
      backgroundColor:'#484848',
      flex:1
    },
    button:{
      backgroundColor:'#7b7b7b',
      width:'60%',
      height:'60%',
      alignSelf:'center'

    },
    text:{
      color:"#ffffff",
    },
    form: {
      flex: 1,
      justifyContent: 'space-between',
    }
});

export default class Master_main_page extends Component<Props>{
    constructor(props){
      super(props);
    }

    render() {
      let info,info2;
      //if(this.props.connected_device_cnt==0)

      info=<Card_list type="connected" connected_device={this.props.connected_device} connected_device_cnt={this.props.connected_device_cnt}/>;
      info2=<Card_list type="disconnected" connected_device={this.props.disconnected_device} connected_device_cnt={this.props.disconnected_device_cnt}/>;
      return (
        <View style={styles.background_view}>
          <Text style={{fontSize:fontSize3,color:special_text_color}}>connection number:{this.props.room}</Text>
          <Card >
             <CardItem bordered >
                  <View style={{flex:1,backgroundColor:'',flexDirection:'row',justifyContent:'space-between'}}>
                      <View style={{alignSelf:'flex-start',backgroundColor:''}}><Text style={{fontSize:fontSize2}}>Master</Text></View>
                      <View style={{alignSelf:'flex-end',backgroundColor:''}}><Text style={{fontSize:fontSize2}}>master name</Text></View>
                  </View>
             </CardItem>
         </Card>

        {info}
        {info2}


        </View>
      );
  }
}
