import * as RNFS from 'react-native-fs';

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
      close(){
        this.ws.close();
      }

      send(e){
            if(this.ws.readyState==1) this.ws.send(JSON.stringify(e));
            else console.log("connection error");
      }

      download(file_name){
            RNFS.mkdir(RNFS.ExternalDirectoryPath+'/download').then(()=>{
              console.log("create folder");
              RNFS.downloadFile({
                   fromUrl: 'http://10.0.2.2:5000/'+file_name,
                   toFile: `${RNFS.ExternalDirectoryPath}/download/${file_name}`,
                   //headers

                   begin: (res: DownloadBeginCallbackResult) => {
                     console.log("Response begin ===\n\n");
                     console.log(res);
                   },
                   progress: (res: DownloadProgressCallbackResult) => {
                    //here you can calculate your progress for file download

                     console.log("Response written ===\n\n");
                     let progressPercent = (res.bytesWritten / res.contentLength)*100; // to calculate in percentage
                     console.log("\n\nprogress===",progressPercent)
                     //this.setState({ progress: progressPercent.toString() });
                     //item.downloadProgress = progressPercent;
                     console.log(res);
                   }
                 })
                   .promise.then(res => {
                     console.log("res for saving file===", res);
                     //return RNFS.readFile(downloadfilePath, "base64");
              })
            })
      }


      upload(file_name){
        console.log(RNFS.ExternalDirectoryPath+"/download/ddd.jpg");

        // FileTransfer.upload({
        //   uri: uri,
        //   uploadUrl: 'http://10.0.2.2:5000/upload',
        //   fileName: 'ddd.jpg',
        //   mimeType: 'image/jpg',
        //   headers: {
        //     'Accept': 'application/json'
        //   },
        //   data: {
        //
        //   }
        // }, (err, res) => {
        //   if(err) {
        //     console.error(err);
        //   } else {
        //     console.log(res);
        //   }
        // });





            // const data = new FormData();
            // const url="https://calm-goat-12.localtunnel.me/upload";
            // const path= RNFS.ExternalDirectoryPath+"/download/"+file_name
            // console.log(path);
            // console.log(url);
            // data.append('fileData', {
            // uri : path,
            // // type: response.type,
            // name: file_name
            // });
            // const config = {
            //     method: 'POST',
            //     headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'multipart/form-data',
            //     },
            //     // headers: {
            //   	// 	"Accept": "application/json",
            //   	// 	"Content-Type": 'application/json',
            //   	// 	"Connection": "close",
            //   	// 	"type": "getUserData",
            //     // },
            //     body: data,
            // };
            //
            // fetch(url, config)
            // .then((checkStatusAndGetJSONResponse)=>{
            // console.log(checkStatusAndGetJSONResponse);
            // }).catch((err)=>{console.log(err)});




            console.log("here");
            let url="https://192.168.191.81:5000/upload";
            console.log(url);
          uploadAudio = async () => {
             const path = RNFS.ExternalDirectoryPath+"/download/ddd.jpg";
               const formData = new FormData()
               formData.append('file', {
                 uri: path,
                 name: 'ddd.jpg',
                 type: 'image/jpeg',
               })
               try {
                 const res = await fetch(url, {
                   method: 'POST',
                   headers: {
                     'Content-Type': 'multipart/form-data',
                     "Connection": "close",
                   },
                   body: formData,
                 })
                 const json = await res.json()
               } catch (err) {
                 alert(err)
               }
           }

          uploadAudio();


      }
}
