import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { AppGateway } from './socket/app.gateway';
import { MessageModule } from './messageModule/message.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGOURL), MessageModule],
  controllers: [],
  providers: [AppGateway],
  exports: []
})
export class AppModule { }
