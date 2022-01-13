import { SubscribeMessage } from '@nestjs/websockets';

export class SfuStream {
  static receiverPCs = {};
  static senderPCs = {};
  static users = {};
  static socketToRoom = {};

  @SubscribeMessage('start-webrtc')
  startWebrtc() {}
}
