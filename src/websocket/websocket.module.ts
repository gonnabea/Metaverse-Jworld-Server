import { Module } from '@nestjs/common';
import { LobbyEventsGateway } from './LobbyEvents.gateway';

@Module({
    providers: [LobbyEventsGateway]
})
export class WebsocketModule {
    
}
