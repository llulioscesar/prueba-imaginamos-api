import {Body, Controller, Get, HttpStatus, Param, Post, Put, Res} from '@nestjs/common';
import {CrearClienteDto} from './dto/crear-cliente-dto';
import {ClienteService} from './cliente.service';
import {MensajeError} from '../utils/MensajeError';

@Controller('cliente')
export class ClienteController {
    constructor(private clienteServicio: ClienteService) {

    }
    @Post()
    crear(@Body() crearClienteDto: CrearClienteDto, @Res() respuesta) {
        this.clienteServicio.crear(crearClienteDto)
            .then(cliente => {
                return respuesta
                    .status(HttpStatus.CREATED)
                    .json(cliente);
            })
            .catch(e => {
                // tslint:disable-next-line:no-console
                console.log(typeof(e))
                return respuesta
                    .status(HttpStatus.FORBIDDEN)
                    .json(new MensajeError(e).msj('No se creo el cliente.'));
            });
    }

    @Put(':id')
    actualizar(@Body() actualizarClienteDto: CrearClienteDto, @Res() respuesta, @Param() id) {
        this.clienteServicio
            .actualizar(id, actualizarClienteDto)
            .then(cliente => {
                return respuesta
                    .status(HttpStatus.OK)
                    .json(cliente);
            })
            .catch(e => {
                return respuesta
                    .status(HttpStatus.FORBIDDEN)
                    .json(new MensajeError(e).msj('No se actualizo el cliente'));
            });
    }
}
