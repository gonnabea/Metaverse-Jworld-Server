import { WebSocket } from 'ws';

export interface broadcastPayload {
  event: string;
  msg: string;
}

export interface wsClient {
  connectedRoomId: string;
  nickname: string;
  id: string;
  socketId: string
}

export interface wsRoom {
  id: string;
  roomName: string;
  creator: string; // 방장 id
  userList: Array<any>; // 방에 접속 중인 유저 목록
  createdAt: string;
  maxPeopleNum: number;
}
