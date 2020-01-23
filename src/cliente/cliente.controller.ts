import {Body, Controller, Get, Post, Put} from '@nestjs/common';
import {CrearClienteDto} from './dto/crear-cliente-dto';

@Controller('cliente')
export class ClienteController {
    @Post()
    crear(@Body() crearClienteDto: CrearClienteDto) {
        return 'cliente creado';
    }

    @Put(':id')
    actualizar(@Body() actualizarClienteDto: CrearClienteDto) {
        return 'ClienteEntity actualizado';
    }
}
