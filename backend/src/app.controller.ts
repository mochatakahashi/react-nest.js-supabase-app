import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('guestbook')
  async getMessages() {
    return this.appService.getMessages();
  }

  @Post('guestbook')
  async createMessage(@Body() body: { name: string; message: string }) {
    return this.appService.createMessage(body.name, body.message);
  }

  @Delete('guestbook/:id')
  async deleteMessage(@Param('id') id: string) {
    return this.appService.deleteMessage(Number(id));
  }
}