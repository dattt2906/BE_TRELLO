import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse
  } from "@nestjs/websockets";
  import { Server, Socket } from "socket.io";
  
  @WebSocketGateway(8001, {
    cors: {
      origin: "*"
    }
  })
  export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly connectedClients: Map<string, Socket> = new Map();
  
    @WebSocketServer() server: Server;
  
    handleConnection(socket: Socket) {
      console.log("connect", socket.id);
      this.connectedClients.set(socket.id, socket);
    }
  
    handleDisconnect(socket: Socket) {
      console.log("disconnect", socket.id);
      this.connectedClients.delete(socket.id);
    }
    @SubscribeMessage('text-chat')
    handleMessage(@MessageBody() message :{nickname, message}){

        console.log(message)
    }
  
    @SubscribeMessage("join-room")
    handleJoinRoom(socket: Socket, roomId: string) {
      socket.join(roomId);
    }
  
    @SubscribeMessage("message")
    handleSentMessage(socket: Socket, payload: any): void {
      const { roomId, content } = payload;
      this.server.to(roomId).emit("message", content);
    }
  
    @SubscribeMessage("add-card")
    handleAddCard(socket: Socket, payload: any): void {
      const { boardId, content } = payload;
      this.server.to(boardId).emit("add-card", content);
    }
    @SubscribeMessage("server-event")
    handleServerEvent(socket:Socket, data:any):void{

        data="Day la su kien goi tu server"
        this.server.emit("server-event", data);
    }

  
  }