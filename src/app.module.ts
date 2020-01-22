import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteController } from './cliente/cliente.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {configService} from '../config/config.service';

@Module({
  imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [AppController, ClienteController],
  providers: [AppService],
})
export class AppModule {}
