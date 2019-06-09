import React ,{Component} from 'react';
import {View,Text,TextInput} from 'react-native';
import { StyleSheet } from 'react-native';
import { Button,Image } from 'react-native-elements';
const fontSize1=30;
const fontSize1_5=25;
const fontSize2=15;
const special_text_color='#33d9e1';
const styles=StyleSheet.create({
    background_view:{
      backgroundColor:'#484848',
      flex:1
    },
    button:{
      backgroundColor:'#7b7b7b',
      width:'40%',
      height:'60%',
      alignSelf:'center'

    },
    text:{
      color:"#ffffff",
    }
});
export default class Master2 extends Component<Props>{
  constructor(props){
    super(props);
  }
  render(){
    return(

        <View style={styles.background_view}>

                <View style={{flex:2}}></View>
                <View style={{backgroundColor:'',flex:2,alignItems:'center'}}>
                    <Text style={{fontSize:28,fontWeight: 'bold', color:styles.text.color}}>Create Successfully</Text>
                </View>

                <View style={{backgroundColor:'',flex:3,alignItems:'center'}}>

                  <Image
                    source={require('./images/success.png')}
                    style={{ width: 120, height:120 }}
                  />
                  <Text style={{fontSize:fontSize1,color:special_text_color}}>{this.props.room}</Text>
                </View>



                <View style={{backgroundColor:'',flex:3,flexDirection:'column',alignSelf:'center',alignItems:'center'}}>

                    <Text style={{fontSize:20, fontWeight: 'bold',color:styles.text.color,textAlign:'center'}}>Now let recorders enter the number
                    </Text>
                    <Text style={{fontSize:20, fontWeight: 'bold',color:styles.text.color,textAlign:'center'}}>to conneect with you!!</Text>
                </View>
                <View style={{flex:3}}>
                    <Button type='solid' title="OK" buttonStyle={styles.button} onPress={()=>{
                      //this.props.ch_page(3)
                    //  console.log("press");
                      this.props.navigation.navigate("Master_main_page");
                    }}/>
                    <Button  type='solid' title="send" style={{backgroundColor:'red'}} onPress={()=>{
                      let msg={};
                      // msg.event="device_join";
                      // msg.data={user_name:"1",track:"1"};
                      // this.props.screenProps.ws_fire_event(JSON.stringify(msg));
                      if(this.props.screenProps.mode==1){
                        if(this.props.screenProps.record_stste==0)this.props.screenProps.all_start();
                        else this.props.screenProps.all_stop();
                      }
                    }}/>
                </View>

        </View>

    );
  }

}

//
// <View style={{flex:3,alignSelf:'center',alignItems:'center',flexDirection:'row'}}>
//
// </View>

// <View style={{flex:5,flexDirection:'column',alignSelf:'center',alignItems:'center'}}>
//     <Text style={{fontSize:fontSize1_5,color:styles.text.color,alignSelf:'center'}}>Now, let recoders enter the number</Text>
//     <Text style={{fontSize:fontSize1_5,color:styles.text.color,alignSelf:'center'}}>to conneect with you</Text>
// </View>
