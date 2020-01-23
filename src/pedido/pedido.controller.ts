import {Body, Controller, Post, Put} from '@nestjs/common';
import {CrearPedidoDto} from './dto/crear-pedido-dto';

@Controller('pedido')
export class PedidoController {

    @Post()
    crear(@Body() pedido: CrearPedidoDto) {
        return '';
    }

    @Put(':id')
    actualizar(@Body() pedido: CrearPedidoDto) {
        return '';
    }

}
