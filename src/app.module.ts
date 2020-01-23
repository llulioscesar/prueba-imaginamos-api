import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteController } from './cliente/cliente.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {configService} from './config/config.service';
import {Cliente} from './cliente/entities/cliente.entity';
import { ClienteService } from './cliente/cliente.service';

// tslint:disable-next-line:no-console
console.log(__dirname)

@Module({
  imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
      TypeOrmModule.forFeature([Cliente]),
  ],
  controllers: [AppController, ClienteController],
  providers: [AppService, ClienteService],
})
export class AppModule {}
