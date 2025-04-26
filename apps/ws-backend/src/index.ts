import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "@repo/backend-common/config";

const wss = new WebSocketServer({ port:8080});

wss.on('connection', function connection(ws, request){
    const url = request.url;
    if(!url){
        return;
    }

    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get('token') || "";

    const decoded = jwt.verify(token,JWT_TOKEN);

    if(typeof decoded == "string"){
    ws.close();
    return;   
    }
    //------
    //above we said if it is string just return . THIS IS BETTER APPROACH
    // -----OR------ 
    //below we said that take decoded as jwtpayload only as we know it is . nut TS does not know
    //-------
    //if(!decoded || !(decoded as JwtPayload).userId){

    if(!decoded || !(decoded).userId){
        ws.close();
        return;
    }

    ws.on('message', function message(data){
        ws.send("hello zoro")
    })

})