class Button extends HTMLElement{
    connectedCallback(){
    this.render()
   }

   render(){
       const div = document.createElement("div");
       const style = document.createElement("style")

      div.innerHTML=`
      <button class="button">Comenzar</button>
      `
    style.innerHTML=`
    .button{
        width: 100%;
        height: 50px;
        font-size: 22px;
        background-color: #9CBBE9;
        border:1px solid black;
        border-radius: 2px;
    }
    `
    this.appendChild(div);
    this.appendChild(style)
   }
  
}
customElements.define("component-button",Button)