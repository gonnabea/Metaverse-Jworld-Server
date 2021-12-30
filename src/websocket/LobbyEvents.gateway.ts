import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { wsClient, wsRoom } from 'src/websocket/types/wsTypes';
import { Server as wsServer, WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { Socket } from 'socket.io';

const options = {
  cors: {
    origin: ["http://localhost:3000", "ws://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
    
  }
}

@WebSocketGateway(4001, options)
export class LobbyEventsGateway {
  
  @WebSocketServer()
  server: wsServer;

  static wsClients: Array<wsClient> = [];
  static wsRooms: Array<wsRoom> = [];

  // 새로운 클라이언트 접속 시
  @SubscribeMessage('enter-lobby')
  createConnection(
    @ConnectedSocket() client,
    @MessageBody() {nickname}) {

    const newClient = {
      nickname,
      connectedRoomId: null,
      id: client.id
    }

    LobbyEventsGateway.wsClients.push(newClient);
    console.log(nickname)
    console.log(LobbyEventsGateway.wsClients.length);

    client.emit('enter-lobby', {
          client: client.id, // 새로 접속한 클라이언트 id 전송
          activeRooms: LobbyEventsGateway.wsRooms, // 현재 생성된 방 목록 전송
        }
    );
    
  }

  // 전체 채팅
  @SubscribeMessage('chat')
  handleBroadcast(
    @ConnectedSocket() client: Socket, 
    @MessageBody() msg
  ) {
    try{
      console.log(msg.nickname)
      console.log(msg);
      
      client.broadcast.emit("chat", { client: msg.nickname, msg: msg.text });
    }
    catch(error) {
      console.log(error)
    }
  }

  // 웹소켓 룸 만들기
  @SubscribeMessage('create-room')
  async createRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomName, nickname, maxPeopleNum }
    ) {
    try {

      const newRoom: wsRoom = {
        roomName,
        id: uuidv4(),
        creator: nickname,
        createdAt: new Date(),
        userList: [client.id],
        maxPeopleNum,
      };
1
      client.join(newRoom.id);

      // 유저의 현재 접속중인 방 업데이트해주기
      LobbyEventsGateway.wsClients.map(clientObj => {
        clientObj.connectedRoomId = newRoom.id
      });
      
      console.log("LobbyEventsGateway.wsClients");
      console.log(LobbyEventsGateway.wsClients);

      console.log(client.rooms)

      // 전체 방 목록 업데이트 해주기
      LobbyEventsGateway.wsRooms.push(newRoom);
      // console.log(LobbyEventsGateway.wsRooms);

      client.emit('create-room', {roomId: newRoom.id, nickname, maxPeopleNum});

    } catch (error) {
      console.log(error);
    }
  }

  // 웹소켓 룸 참여하기
  @SubscribeMessage('join-room')
  async joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomId }
   ) {
    try {

      // 방의 유저 목록 업데이트
      LobbyEventsGateway.wsRooms.map((room: wsRoom) => {

        if (room.id === roomId) {
          room.userList.push(client.id);
        }

      });

      // 유저의 현재 접속중인 방 업데이트해주기
      LobbyEventsGateway.wsClients.map(clientObj => {

        if(clientObj.id === client.id) {
          clientObj.connectedRoomId = roomId
        }

      });
      
    } catch (error) {
      console.log(error);
    }
  }

  // 웹소켓 룸 나가기
  @SubscribeMessage('leave-room')
  async leaveRoom(
    @ConnectedSocket() client: wsClient,
    @MessageBody() { id }
    ) {
    try {
      // 해당 유저가 접속해있는 룸 찾기
      const room = LobbyEventsGateway.wsRooms.find((room: wsRoom) => room.id === id);

      // 해당 유저를 뺀 나머지를 유저리스트로 설정
      room.userList = room.userList.filter(
        (user) => user.id !== client.id,
      );

      // 만약 남은 유저가 없을 경우 방 삭제
      if (room.userList.length === 0) {
        LobbyEventsGateway.wsRooms = LobbyEventsGateway.wsRooms.filter((room: wsRoom) => room.id !== id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async handleDisconnect( @ConnectedSocket() client: Socket) {
    try {
    
      console.log('로비 떠나기');
      console.log(client.id)
      let connectedRoomId;

      // 접속 중인 유저 목록에서 제거
      LobbyEventsGateway.wsClients.map(clientObj => {
        if(client.id === clientObj.id) {
          connectedRoomId = clientObj.connectedRoomId;
          clientObj.connectedRoomId = null;
        }
      });
                                                
      // 방의 유저 목록에서 유저 제거
      LobbyEventsGateway.wsRooms.map(room => {
        if(room.id === connectedRoomId) {
          console.log("매칭된 룸");
          console.log(room)
          room.userList = room.userList.filter(clientId => clientId != client.id);
          console.log(room)

        }
      })

      // 유저 리스트에서 유저 제거
      LobbyEventsGateway.wsClients = LobbyEventsGateway.wsClients.filter(clientObj => clientObj.id != client.id)

      console.log("LobbyEventsGateway.wsClients")
      console.log(LobbyEventsGateway.wsClients);
      
      console.log("LobbyEventsGateway.wsRooms")
      console.log(LobbyEventsGateway.wsRooms);
      client.disconnect();


      
      
        // // 룸에서 해당 유저 제거
        // connectedRoom.userList = connectedRoom.userList.filter(
        //   (user) => user.id !== client.id,
        // );

        // // 유저가 접속해 있던 방의 참여자 수가 0이 될 경우
        // // 룸 제거
        // if (connectedRoom.userList.length === 0) {
        //   LobbyEventsGateway.wsRooms = LobbyEventsGateway.wsRooms.filter(
        //     (room) => room.id !== client.connectedRoomId,
        //   );
        // } else {
        //   // 방장 변경
        //   connectedRoom.creatorId = connectedRoom.userList[0].id;
        // }

        
      
    } catch (error) {
      console.log(error);
    }
  }

}
