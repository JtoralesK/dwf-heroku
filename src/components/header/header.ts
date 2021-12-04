class Header extends HTMLElement{
    connectedCallback(){
    this.render()
   }

   render(){
       const div = document.createElement("div");
       const style = document.createElement("style")

      div.innerHTML=`
      <header class="header"></header>
      `
    style.innerHTML=`
    .header{
        width: 100%;
        height: 60px;
        background-color: #FF8282;
    }
    `
    this.appendChild(div);
    this.appendChild(style)
   }
  
}
customElements.define("component-header",Header)