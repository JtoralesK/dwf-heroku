import "./components/button/button"
import "./components/header/header"
import "./pages/home/home"
import "./pages/chat/chat"
import "./router"
import { state } from "./state"
import { json } from "stream/consumers"


function main(){
 state.init()
 state.listenToRoom()
fetch("http://localhost:3000/env").then((res)=>res.json()).then(
(d)=> document.querySelector(".ta").textContent=JSON.stringify(d)


)
}
main();