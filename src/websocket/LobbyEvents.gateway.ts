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
import { ConsoleLogger } from '@nestjs/common';

const options = {
  cors: {
    origin: ['http://localhost:3000', 'ws://localhost:3000', "http://146.56.145.39:3000", 'ws://146.56.145.39:4001', "https://jetaverse.site" ],
    methods: ['GET', 'POST'],
    credentials: true,
  },
  allowUpgrades: true,
  transports: ['websocket']
};

@WebSocketGateway(options)
export class LobbyEventsGateway {
  @WebSocketServer()
  server: wsServer;

  static wsClients: Array<wsClient> = [];
  static wsRooms: Array<wsRoom> = [];

  // 새로운 클라이언트 접속 시
  @SubscribeMessage('enter-lobby')
  createConnection(
    @ConnectedSocket() client: Socket,
    // 만약 비회원 로그인 시 웹소켓 랜덤 고유 id를 부여
    @MessageBody() { nickname, userId = client.id },
  ) {
    client.join('lobby');
    client.to('lobby').emit("enter-lobby", `${nickname}님이 로비에 입장하셨습니다.`)
    const newClient = {
      nickname,
      connectedRoomId: null,
      id: userId,
      socketId: client.id
    };

    client.data.userId = userId;
    // 유저 리스트 중복 방지
    // const checkDuplicated = LobbyEventsGateway.wsClients.find(user => user.id === userId)
    // if(!checkDuplicated)
      LobbyEventsGateway.wsClients.push(newClient);


    client.to('lobby').emit('enter-lobby', {
      client: client.id, // 새로 접속한 클라이언트 id 전송
      activeRooms: LobbyEventsGateway.wsRooms, // 현재 생성된 방 목록 전송
    });
  }

  // 전체 채팅
  @SubscribeMessage('chat')
  handleBroadcast(@ConnectedSocket() client: Socket, @MessageBody() msg) {
    try {
      console.log(msg.nickname);
      console.log(msg);

      client.broadcast.emit('chat', { client: msg.nickname, msg: msg.text });
    } catch (error) {
      console.log(error);
    }
  }

  // 웹소켓 룸 만들기
  @SubscribeMessage('create-room')
  async createRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomName, nickname, maxPeopleNum, userId = client.id },
  ) {
    try {

      const user = LobbyEventsGateway.wsClients.find(client => client.id === userId)
      
      const newRoom: wsRoom = {
        roomName,
        id: uuidv4(),
        creator: nickname,
        createdAt: new Date().toLocaleString(),
        userList: [user],
        maxPeopleNum,
      };

      client.data.userId = userId;
      client.data.connectedRoomId = newRoom.id;

      client.join(newRoom.id); // 실제 소켓룸에 접속
  
      // 유저의 현재 접속중인 방 업데이트해주기
      LobbyEventsGateway.wsClients.map((clientObj) => {
        clientObj.connectedRoomId = newRoom.id;
      });

      // 전체 방 목록 업데이트 해주기
      LobbyEventsGateway.wsRooms.push(newRoom);

      // 방 생성 후 유저 리다이렉트 해주기 위함
      client.emit('create-room', {
        roomId: newRoom.id
      });

      // 타 유저 로비 화면 업데이트 위함
      client.to('lobby').emit('reload-lobby', {
        activeRooms: LobbyEventsGateway.wsRooms,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // 웹소켓 룸 참여하기
  @SubscribeMessage('join-room')
  async joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomId, userId = client.id },
  ) {
    try {

      // 웹소켓 실체 클라이언트에도 join 시켜주기
      client.data.userId = userId;
      client.data.connectedRoomId = roomId;
      const user = LobbyEventsGateway.wsClients.find(client => client.id === userId)
      
      // 방의 유저 목록 업데이트
      LobbyEventsGateway.wsRooms.map((room: wsRoom) => {
        if (room.id === roomId) {
          room.userList.push(user);
        }
      });
      const room = LobbyEventsGateway.wsRooms.find(room => room.id === roomId);
      
      // 유저의 현재 접속중인 방 업데이트해주기
      LobbyEventsGateway.wsClients.map((clientObj) => {
        if (clientObj.id === userId) {
          clientObj.connectedRoomId = roomId;
        }
      });
      client.join(roomId)

      // 타 유저에게 로비 화면 업데이트 시키기 (입장 유저 수 증가)
      client.broadcast.emit('reloadLobby', {
        activeRooms: LobbyEventsGateway.wsRooms,
      });

      // 룸 내에 있는 유저들에게 새로운 유저 입장했다고 알리기
      client.broadcast.emit("join-room", {roomId, userId, userList: room.userList})
      
    } catch (error) {
      console.log(error);
    }
  }

  // 웹소켓 룸 나가기
  @SubscribeMessage('leave-room')
  async leaveRoom(
    @ConnectedSocket() client,
    @MessageBody()
    { roomId = client.data.connectedRoomId, userId = client.data.userId },
  ) {
    try {
      console.log('스트리밍 룸 떠나기');
      console.log(roomId);
      console.log(userId);

      // 해당 유저가 접속해있는 룸 찾기
      const room = LobbyEventsGateway.wsRooms.find(
        (room: wsRoom) => room.id === roomId,
      );

      // 해당 유저를 뺀 나머지를 유저리스트로 설정
      if(room)
      room.userList = room.userList.filter((user) => user.id !== userId);
      

      // 실제 객체에 적용
      LobbyEventsGateway.wsRooms.map((wsRoom: wsRoom) => {
        if(wsRoom.id === roomId) {
          wsRoom.userList = room.userList
        }
      }) 


      // 만약 남은 유저가 없을 경우 방 삭제
      if (room && room.userList.length === 0) {
        LobbyEventsGateway.wsRooms = LobbyEventsGateway.wsRooms.filter(
          (room: wsRoom) => room.id !== roomId,
        );
      }

      client.data.connectedRoomId = null;

      client.broadcast.emit('reload-lobby', {
        activeRooms: LobbyEventsGateway.wsRooms,
      });

      client.broadcast.emit('leave-room', {userId})
    } catch (error) {
      console.log(error);
    }
  }

  @SubscribeMessage('avatar-move')
  async handleAvatarMove(
    @ConnectedSocket() client: Socket,
    @MessageBody() {
      roomId = client.data.connectedRoomId, userId = client.data.userId, position = { x:0, y:0, z:0 }, rotateZ = 0
    }
      
    ) {
      try {
        
        // client.to(roomId).emit('avatar-move', {roomId, userId, position, rotateZ})
        client.to(roomId).emit('avatar-move', {roomId, userId, position, rotateZ})
      }
      catch(error) {
        console.log(error)
      }
  }


  // 특정 룸의 유저리스트 반환 해주는 리스너
  @SubscribeMessage('get-user-list')
  async getUserList(
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomId = client.data.connectedRoomId }
    ) {
      try {
        console.log(LobbyEventsGateway.wsRooms)
        client.join(roomId)
        const userList = LobbyEventsGateway.wsRooms.map(room => {
          if(room.id === roomId) {
            return room.userList
          }
        })
        client.emit('get-user-list', { userList: userList[0] })
      }
      catch(error) {
        console.log(error)
      }
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    try {

      // this.leaveRoom(client, {
      //   roomId: client.data.connectedRoomId,
      //   userId: client.data.userId,
      // });
    } catch (error) {
      console.log(error);
    }
  }
}
