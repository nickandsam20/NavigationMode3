import React ,{Component} from 'react';
import App from './App';
import Connection from './Connection';
import {View,Text,Button,TextInput} from 'react-native';
//import { StackNavigator, NavigationActions} from 'react-navigation';

export default class Top extends Component<Props>{


  constructor(props){
      super(props);



      //this. ch_page=this. ch_page.bind(this);
      this.set_room_number=this.set_room_number.bind(this);
      this.ch_mode=this.ch_mode.bind(this);
      this.get_room=this.get_room.bind(this);
      this.get_connected_device=this.get_connected_device.bind(this);
      this.get_disconnected_device=this.get_disconnected_device.bind(this);
      this.get_connected_device_cnt=this.get_connected_device_cnt.bind(this);
      this.get_disconnected_device_cnt=this.get_disconnected_device_cnt.bind(this);
      this.send=this.send.bind(this);
      this.device_join=this.device_join.bind(this);
      this.ws_fire_event=this.ws_fire_event.bind(this);


      this.connect=new Connection(this.ws_fire_event);

      let init_state={
        mode:0, //0為未選擇 1為recoder 2為master
        room:-1,//-1為未選擇
        name:"user",
        connected_device_cnt:0,
        disconnected_device_cnt:0,
        connected_device:[
          // {
          //   user_name:'1',
          //   track:1
          // },
          // {
          //   user_name:'2',
          //   track:2
          // },
          // {
          //   user_name:'3',
          //   track:3
          // }
        ],
        disconnected_device:[],
        ch_mode:this.ch_mode,
        set_room_number:this.set_room_number,
        get_room:this.get_room,
        //connected_device:this.state.connected_device,
        //disconnected_device:this.state.disconnected_device,
        //get_connected_device:this.get_connected_device,
        //get_disconnected_device:this.get_disconnected_device,
        //get_connected_device_cnt:this.get_connected_device_cnt,
        //get_disconnected_device_cnt:this.get_disconnected_device_cnt,
        ws_fire_event:this.ws_fire_event,
        send:this.send,
        //connected_device:this.state.connected_device,
        //connected_device_cnt:this.state.connected_device_cnt
      };


      this.state=init_state;
      // this.allProps={
      //   ch_mode:this.ch_mode,
      //   set_room_number:this.set_room_number,
      //   get_room:this.get_room,
      //   connected_device:this.state.connected_device,
      //   disconnected_device:this.state.disconnected_device,
      //   get_connected_device:this.get_connected_device,
      //   get_disconnected_device:this.get_disconnected_device,
      //   get_connected_device_cnt:this.get_connected_device_cnt,
      //   get_disconnected_device_cnt:this.get_disconnected_device_cnt,
      //   ws_fire_event:this.ws_fire_event,
      //   send:this.send,
      //   connected_device:this.state.connected_device,
      //   connected_device_cnt:this.state.connected_device_cnt
      // }
  }

  componentDidMount(){

  }
  render(){
      return(
        <App props={this.state}/>
      );
  }

  //  ch_page(p){
  //     this.setState({page:p});
  //     console.log("press");
  // }
  ws_fire_event(e){
      console.log("fire");
      let msg=JSON.parse(e);
      //console.log(msg.data);
      switch (msg.event) {
        case 'device_join':
              this.device_join(msg.data)
        break;
        default:
          console.log("default");
      }
      //this.device_join();
      //console.log(this.state);
  }
  device_join(d){
      console.log("device join");

      this.setState({connected_device:[...this.state.connected_device,d],connected_device_cnt:this.state.connected_device_cnt+1});
      //else this.setState({connected_device:[d],connected_device_cnt:this.state.connected_device_cnt+1});

  }
  send(msg){
    this.connect.send(msg);
  }
  get_connected_device(){
    return this.state.connected_device;
  }
  get_disconnected_device(){
    return this.state.disconnected_device;
  }
  get_connected_device_cnt(){
    return this.state.connected_device_cnt;
  }

  get_disconnected_device_cnt(){
    return this.state.disconnected_device_cnt;
  }

  ch_mode(m){
      this.setState({mode:m});
      console.log("ch_mode")
  }
  set_room_number(n){
    this.setState({room:n});
  }
  get_room(){
    return this.state.room;
    //console.log(this.state.room);
  }
}
