import {state} from"../../state"

type Message = {
  from : string 
  message:string
}
class Chat extends HTMLElement{
    connectedCallback(){
    this.render()
   
    state.suscribe(()=>{
      const cs = state.getState()
       this.messages = cs.messages 
      console.log(this.messages);
      this.render()
       
  })
   }
  messages:Message[]=[]
  
   render(){

    //const messages =[{from:"javier",message:"ASd"},{from:"jatatier",message:"ASdasdsa"}]
       const style = document.createElement("style")

      this.innerHTML=`
      <component-header></component-header>
      <section class="section">
      
      <form class="form">
      <h1 class="title">Chat</h1>
      <div>
    <div class="messajes">
    ${this.messages.map(r=>{
        return `<div class="messaje">${r.from}:${r.message}</div>`
    }).join("")}
    </div>
    </div>
      <label >
      <input class="input_form" type="text" name="chat" >
      </label>
     <div class="tata">
     <component-button ></component-button>
     </div>
      </form>
      </section>
      `
    style.innerHTML=`
    .title{
      font-size: 52px;
      font-weight: 700;
      font-family: 'Roboto', sans-serif;
      margin: 16px;
      text-align:center;
    }
    .section{
      width: 100%;
      width: 310px;
      margin:0 auto;
      
     }
     .input_form{
      width: 100%;
      height: 45px;
      font-size: 17px;
    }
    .tata{
      margin-top:10px;
    }
    `
     const form = this.querySelector(".form")
    form.addEventListener("submit",(e)=>{
      e.preventDefault()
      const target:any = e.target
      state.pushMessage(target.chat.value)
    })
   
    this.appendChild(style)
   }
  
}
customElements.define("chat-el",Chat)