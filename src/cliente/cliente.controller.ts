import {Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res} from '@nestjs/common';
import {CrearClienteDto} from './dto/crear-cliente-dto';
import {ClienteService} from './cliente.service';
import {MensajeError} from '../utils/MensajeError';
import {ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam} from '@nestjs/swagger';
import {Cliente} from './entities/cliente.entity';
import {Response} from 'express';

@Controller('cliente')
export class ClienteController {
    constructor(private clienteServicio: ClienteService) {}

    @Post()
    @ApiCreatedResponse({description: 'El cliente se ha creado correctamente', type: Cliente})
    @ApiForbiddenResponse({description: 'Ocurrio un error al crear el cliente', type: MensajeError})
    crear(@Body() crearClienteDto: CrearClienteDto, @Res() respuesta: Response) {
        this.clienteServicio.crear(crearClienteDto)
            .then(cliente => {
                return respuesta
                    .status(HttpStatus.CREATED)
                    .json(cliente);
            })
            .catch(e => {
                return respuesta
                    .status(HttpStatus.FORBIDDEN)
                    .json(new MensajeError(e).msj('No se creo el cliente.'));
            });
    }

    @Put(':id')
    @ApiOkResponse({description: 'Se actualizo correctamente el cliente', type: Cliente})
    @ApiForbiddenResponse({description: 'Ocurrio un error al actualizar el cliente', type: MensajeError})
    @ApiParam({name: 'id', description: 'id del cliente a actualizar datos', type: 'string', allowEmptyValue: false, required: true})
    actualizar(@Body() actualizarClienteDto: CrearClienteDto, @Res() respuesta: Response, @Param('id') id: string) {
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

    @Get('correo/:correo/direcciones')
    @ApiOkResponse({description: 'Informacion del cliente', type: Cliente})
    @ApiForbiddenResponse({description: 'Ocurrio un error al consultar el cliente por correo', type: MensajeError})
    @ApiNotFoundResponse({description: 'No se encontro ningun resultado al consultar cliente por correo', type: MensajeError})
    @ApiParam({name: 'correo', description: 'Correo a buscar', type: 'string', allowEmptyValue: false, required: true})
    buscarPorCorreo(@Res() respuesta: Response, @Param('correo') correo: string) {
        this.clienteServicio
            .buscarPorCorreo(correo)
            .then(cliente => {
                if (cliente === undefined) {
                    return respuesta
                        .status(HttpStatus.NOT_FOUND)
                        .json(new MensajeError({
                            code: 1001,
                            detail: 'Result undefined search filter',
                        })
                            .msj(`Cliente no encontrado por filtro correo: ${correo}`));
                }
                return respuesta
                    .status(HttpStatus.OK)
                    .json(cliente);
            })
            .catch(e => {
                return respuesta
                    .status(HttpStatus.FORBIDDEN)
                    .json(new MensajeError(e).msj(`Ocurrio un error al consultar el cliente por correo`));
            });
    }
}
