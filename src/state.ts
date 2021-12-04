import { getDatabase, ref, onValue } from "firebase/database";
import {rtdb} from"./rtdb"
import map from"lodash/map"

type Message = {
    from : string 
    messajes:string
}
const API_BASE_URL = "http://localhost:4000"

export const state={
    
    data:{
        email:"",
        fullname:"",
        userId:"",
        roomId:"",
        rtdbID:"",
        messages:[]
    },
    listerners:[],
    getState(){
        return this.data
    },
    setState(newData){
        this.data = newData
        for (const callback of this.listerners) {
            callback()
        }
        localStorage.setItem("state",JSON.stringify(newData))
        console.log("el state ha cambiado",state.getState());
        
    },
    init(){
        const cs = this.getState()
      if(!localStorage.state){
        this.setState(cs)
      }else{
        const localData = JSON.parse(localStorage.getItem("state"))
      
        this.setState({...cs,localData}) 
      }
    },
    listenToRoom(){ 
        
      const cs = this.getState()
     const referdata = ref(rtdb,"/rooms/"+cs.rtdbID);
       
        onValue(referdata, (snapshot)=>{
         const dataDelServer = snapshot.val();
         const listMessages = map( dataDelServer.messages)
         cs.messages=listMessages
         this.setState(cs)
     
    })

    },
    suscribe(callback:(any)=>any){
        this.listerners.push(callback)
       
    
    },
    setEmailAndFullName(email:string,fullname:string){
        const currenState = this.getState()
        currenState.email=email;
        currenState.fullname = fullname;
        this.setState(currenState)
    },
    signUp(callback){
        const cs = this.getState();
        if(cs.email){
            fetch(API_BASE_URL +"/auth",{
                method:"post",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({email:cs.email})
            }).then((res=>{
                return res.json()
            })).then(resp=>{
                cs.userId=resp.id
                this.setState(cs)
              callback()
                
            })
        }else{
            console.error("no hay un email en el state")
            callback(true)
        }
    },
    askId(callback?){
        const cs = this.getState();
        if(cs.userId){
            fetch(API_BASE_URL +"/rooms",{
                method:"post",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({userId:cs.userId})
            }).then((res=>{
                return res.json()
            })).then(resp=>{
                cs.roomId=resp.id
                this.setState(cs)
              if(callback){
                  callback()
              }
                
            })
            
        }else{
            console.error("no hay id")
        }
    },
    accessToRoom( callback?){
        const cs = this.getState();
        const roomId= cs.roomId
         fetch(API_BASE_URL +"/rooms/"+roomId+"?userId="+cs.userId ,{  
         }).then((res=>{
             return res.json()
          })).then(resp=>{
             
              
              cs.rtdbID=resp.rtdbID
              this.setState(cs)
            //   this.listenToRoom()
              if(callback){
                callback()
               
            }
                
            })
    
},  pushMessage(message:Message){
    const cs = this.getState()
    fetch(API_BASE_URL+"/"+`${cs.rtdbID}`+"/messages",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            from:this.data.fullname,
            message:message
        })
    }
    )
}
}
