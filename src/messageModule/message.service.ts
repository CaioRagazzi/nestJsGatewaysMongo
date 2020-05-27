import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message } from "./message.interface";
import { CreateMessageDto } from "./message.dto";

@Injectable()
export class MessageService {
  constructor(@InjectModel('Message') private messageModel: Model<Message>) { }

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const createdCat = new this.messageModel(createMessageDto);
    return createdCat.save();
  }

  async findAll(): Promise<Message[]> {
    return this.messageModel.find().limit(10).sort({_id: -1}).exec();
  }
}