export default class Connection{
  constructor(fire){
    this.ws=new WebSocket('ws://10.0.2.2:3000');
    this.send=this.send.bind(this);
    this.ws.onopen=()=>{
      console.log("connect to server");
    };

    this.ws.onerror=e=>{
      console.log(e.message);
    };
    this.ws.onmessage=e=>{

        console.log("message");
        fire(e.data);
    }
    this.ws.onclose=e=>{
      console.log(e.code,e.reason);
    };
    this.send=this.send.bind(this);

  }

  send(e){
    if(this.ws.readyState==1) this.ws.send(JSON.stringify(e));
    else console.log("connection error");
  }
}
