import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClienteController } from './cliente/cliente.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {configService} from './config/config.service';
import {Cliente} from './cliente/entities/cliente.entity';
import { ClienteService } from './cliente/cliente.service';
import { DireccionController } from './direccion/direccion.controller';
import { DriverController } from './driver/driver.controller';
import {Driver} from './driver/entities/driver.entity';
import {Direccion} from './direccion/entities/direccion.entity';
import { PedidoController } from './pedido/pedido.controller';
import { DriverService } from './driver/driver.service';
import { DireccionService } from './direccion/direccion.service';
import { PedidoService } from './pedido/pedido.service';
import {Pedido} from './pedido/entities/pedido.entity';

@Module({
  imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
      TypeOrmModule.forFeature([Cliente, Direccion, Driver, Pedido]),
  ],
  controllers: [ClienteController, DireccionController, DriverController, PedidoController],
  providers: [ClienteService, DriverService, DireccionService, PedidoService],
})

export class AppModule {}
