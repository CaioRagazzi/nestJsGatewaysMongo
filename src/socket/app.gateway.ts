import { SubscribeMessage, WebSocketGateway, MessageBody, ConnectedSocket, OnGatewayConnection, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Server } from 'http';
import { MessageService } from 'src/messageModule/message.service';
import { Message } from "../messageModule/message.interface";

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection {

  constructor(private messageService: MessageService) { }

  private logger: Logger = new Logger('AppGateway');

  @WebSocketServer() wss: Server;

  async handleConnection(@ConnectedSocket() client: Socket) {
    const messages = await this.messageService.findAll()

    client.emit('initialData', { messages })
    this.logger.log(`Client connected: ${client.id} `)
  }

  @SubscribeMessage('messageToServer')
  handleMessage(@MessageBody() data: Message, @ConnectedSocket() client: Socket): void {
    this.messageService.create({ name: data.name, message: data.message })
    this.wss.emit('messageToClient', { name: data })
    // client.emit('messageToClient', { name: data });
  }
}
