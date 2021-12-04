import {Router} from"@vaadin/router"
import {state} from"../../state"
class Home extends HTMLElement{
    connectedCallback(){
    this.render()
    const form = this.querySelector(".form")
    const button = this.querySelector(".button")
    
    form.addEventListener("submit",(e)=>{
      e.preventDefault()
      const target:any = e.target
     
      state.setEmailAndFullName(target.email.value, target.nombre.value)
      
      state.signUp((err)=>{
          if(err){console.error("hubo error en el signUp")};
          state.askId(()=>{
              state.accessToRoom()
          })

      })

      Router.go("/chat")
      
    })
   }


   render(){
   
       const div = document.createElement("div");
       const style = document.createElement("style")

      this.innerHTML=`
      <component-header></component-header>
      <section class="section">
      
      <form class="form">
      <h1 class="title">Bienvenidx</h1>
          <label >
              <p>Email</p>
              <input  class="input_form" type="email" name="email" placeholder="TuNombre@gmail.com" >
          </label>
          <label >
            <p>Nombre</p>
            <input class="input_form" type="text" name="nombre" placeholder="Name" >
          </label>
          <label >
            <p>Room</p>
            <input class="input_form" list="lista" placeholder="Room" >
            <datalist id="lista">
                <option value="Nuevo room"></option>
                <option value="Room Existente"></option>
            </datalist>
          </label>
          <component-button></component-button>
      </form>
      </section>
     
      `
    style.innerHTML=`
   
   @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,400;1,700&display=swap');

    .title{
      font-size: 52px;
      font-weight: 700;
      font-family: 'Roboto', sans-serif;
      margin: 16px;
    }
    .section{
      width: 100%;
      width: 310px;
      margin:0 auto;
      
     }
     .form{
         width: 310px;
         margin:0 auto;
         display: flex;
         flex-direction: column;
         gap: 20px;
        
     }
     .input_form{
         width: 100%;
         height: 45px;
         font-size: 17px;
     }
    `
   
    this.appendChild(style)
   }
  
}
customElements.define("home-el",Home)