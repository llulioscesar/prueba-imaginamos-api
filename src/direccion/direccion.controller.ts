import {Body, Controller, Get, HttpStatus, Post, Res} from '@nestjs/common';
import {CrearDireccionDto} from './dto/crear-direccion-dto';
import {Response} from 'express';
import {DireccionService} from './direccion.service';
import {MensajeError} from '../utils/MensajeError';
import {ApiCreatedResponse, ApiInternalServerErrorResponse} from '@nestjs/swagger';
import {Direccion} from './entities/direccion.entity';

@Controller('direccion')
export class DireccionController {

    constructor(private direccionServicio: DireccionService) {}

    @Post()
    @ApiCreatedResponse({description: 'Se creo la direccion con exito', type: Direccion})
    @ApiInternalServerErrorResponse({description: 'Error al crear la direccion', type: MensajeError})
    crear(@Body() crearDireccion: CrearDireccionDto, @Res() respuesta: Response) {
        this.direccionServicio.crear(crearDireccion)
            .then(direccion => {
                return respuesta
                    .status(HttpStatus.CREATED)
                    .json(direccion);
            })
            .catch(e => {
                return respuesta
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json(new MensajeError(e).msj('Ocurrio un error al crear la direccion'));
            });
    }

    @Get()
    listar(@Res() respuesta: Response) {
        this.direccionServicio.listar()
            .then(direcciones => {
                return respuesta
                    .status(HttpStatus.OK)
                    .json(direcciones);
            })
            .catch(e => {
                return respuesta
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json(new MensajeError(e).msj('Ocurrio un error al consultar las direcciones'));
            });
    }

}
