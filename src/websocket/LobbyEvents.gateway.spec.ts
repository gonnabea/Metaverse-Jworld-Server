import { Test, TestingModule } from '@nestjs/testing';
import { LobbyEventsGateway } from './LobbyEvents.gateway';

describe('WebsocketGateway', () => {
  let gateway: LobbyEventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LobbyEventsGateway],
    }).compile();

    gateway = module.get<LobbyEventsGateway>(LobbyEventsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
