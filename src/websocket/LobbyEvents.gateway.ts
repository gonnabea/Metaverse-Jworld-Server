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
    origin: ['http://localhost:3000', 'ws://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
};

@WebSocketGateway(4001, options)
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
    const newClient = {
      nickname,
      connectedRoomId: null,
      id: userId,
      socketId: client.id
    };

    client.data.userId = userId;

    LobbyEventsGateway.wsClients.push(newClient);
    console.log(nickname);
    console.log(LobbyEventsGateway.wsClients.length);

    client.emit('enter-lobby', {
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

      client.join(newRoom.id);

      // 유저의 현재 접속중인 방 업데이트해주기
      LobbyEventsGateway.wsClients.map((clientObj) => {
        clientObj.connectedRoomId = newRoom.id;
      });

      console.log('LobbyEventsGateway.wsClients');
      console.log(LobbyEventsGateway.wsClients);

      console.log(client.rooms);

      // 전체 방 목록 업데이트 해주기
      LobbyEventsGateway.wsRooms.push(newRoom);
      // console.log(LobbyEventsGateway.wsRooms);

      client.emit('create-room', {
        roomId: newRoom.id,
        nickname,
        maxPeopleNum,
      });
      client.broadcast.emit('reloadLobby', {
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
      client.data.userId = userId;
      client.data.connectedRoomId = roomId;
      const user = LobbyEventsGateway.wsClients.find(client => client.id === userId)
      // 방의 유저 목록 업데이트
      LobbyEventsGateway.wsRooms.map((room: wsRoom) => {
        if (room.id === roomId) {
          room.userList.push(user);
        }
      });

      // 유저의 현재 접속중인 방 업데이트해주기
      LobbyEventsGateway.wsClients.map((clientObj) => {
        if (clientObj.id === userId) {
          clientObj.connectedRoomId = roomId;
        }
      });
      client.join(roomId)
      client.broadcast.emit('reloadLobby', {
        activeRooms: LobbyEventsGateway.wsRooms,
      });
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
      room.userList = room.userList.filter((user) => user.id !== userId);
      console.log(room.userList);

      // 실제 객체에 적용
      LobbyEventsGateway.wsRooms.find(
        (room: wsRoom) => room.id === roomId,
      ).userList = room.userList;

      console.log(LobbyEventsGateway.wsRooms);

      // 만약 남은 유저가 없을 경우 방 삭제
      if (room.userList.length === 0) {
        LobbyEventsGateway.wsRooms = LobbyEventsGateway.wsRooms.filter(
          (room: wsRoom) => room.id !== roomId,
        );
      }

      client.data.connectedRoomId = null;

      client.broadcast.emit('reloadLobby', {
        activeRooms: LobbyEventsGateway.wsRooms,
      });
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

       
        // client.send('avatar-move', "move")
        // client.to(roomId).emit('avatar-move', {roomId, userId, position})
        client.broadcast.emit('avatar-move', {roomId, userId, position, rotateZ})
      }
      catch(error) {
        console.log(error)
      }
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    try {
      console.log('로비 떠나기');
      console.log(client.data);
      console.log(client.data.userId);
      console.log(client.data.connectedRoomId);
      let connectedRoomId;
      this.leaveRoom(client, {
        roomId: client.data.connectedRoomId,
        userId: client.data.userId,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
