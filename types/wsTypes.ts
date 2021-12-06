import { WebSocket } from "ws";

export interface broadcastPayload {
  event: string;
  msg: string;
}

export interface wsClient {
  connectedRoomId: string;
  id: string;
}

export interface wsRoom {
  id: string;
  roomName: string;
  creatorId: string; // 방장 id
  userList: Array<any>; // 방에 접속 중인 유저 목록
  createdAt: Date;
}
