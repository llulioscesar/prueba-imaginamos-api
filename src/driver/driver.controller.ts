import {Body, Controller, Get, HttpStatus, Param, Post, Put, Res} from '@nestjs/common';
import {CrearDriverDto} from './dto/crear-driver-dto';
import {DriverService} from './driver.service';
import {Response} from 'express';
import {MensajeError} from '../utils/MensajeError';
import {ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiParam} from '@nestjs/swagger';
import {Driver} from './entities/driver.entity';

@Controller('driver')
export class DriverController {

    constructor(private driverServicio: DriverService) {}

    @Get()
    @ApiOkResponse({description: 'Muestra todos los drivers', type: Driver, isArray: true})
    @ApiInternalServerErrorResponse({description: 'Error al consultar los drivers', type: MensajeError})
    listar(@Res() respuesta: Response) {
        this.driverServicio.listar()
            .then(drivers => {
                return respuesta
                    .status(HttpStatus.OK)
                    .json(drivers);
            })
            .catch(e => {
                return respuesta
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json(new MensajeError(e).msj('Ocurrio un error al consultar todos los drivers'));
            });
    }

    @Post()
    @ApiCreatedResponse({description: 'Se creo con exito el driver', type: Driver})
    @ApiInternalServerErrorResponse({description: 'Error al crear el driver', type: MensajeError})
    crear(@Body() crearDriverDto: CrearDriverDto, @Res() respuesta: Response) {
        this.driverServicio.crear(crearDriverDto)
            .then(driver => {
                return respuesta
                    .status(HttpStatus.CREATED)
                    .json(driver);
            })
            .catch(e => {
                return respuesta
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json(new MensajeError(e).msj('Ocurrio un error al crear el driver'));
            });
    }

    @Put(':id')
    @ApiOkResponse({description: 'Se actualizo con exito el driver', type: Driver})
    @ApiInternalServerErrorResponse({description: 'Error al actualizar el driver', type: MensajeError})
    @ApiParam({name: 'id', description: 'Id del driver a actualizar', allowEmptyValue: false, required: true})
    actualizar(@Body() driverActualizar: CrearDriverDto, @Res() respuesta: Response, @Param('id') id: string) {
        this.driverServicio.actualizar(id, driverActualizar)
            .then(driver => {
                return respuesta
                    .status(HttpStatus.OK)
                    .json(driver);
            })
            .catch(e => {
                return respuesta
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json(new MensajeError(e).msj('Ocurrio un error al actualizar los datos del driver,'));
            });
    }

    @Get(':id/fecha/:fecha')
    @ApiOkResponse({description: 'Muestra los pedido pendientes del driver', type: Driver})
    @ApiInternalServerErrorResponse({description: 'Ocurrio un error al actualizar el pedido', type: MensajeError})
    @ApiParam({name: 'id', description: 'Id del driver', required: true, allowEmptyValue: false})
    @ApiParam({name: 'fecha', description: 'Fecha a consultar', required: true, allowEmptyValue: false})
    consultarIdFecha(@Res() respuesta: Response, @Param('id') id: string, @Param('fecha') fecha: string) {
        this.driverServicio.consultarIdFecha(id, fecha)
            .then(driver => {
                if (driver === undefined) {
                    return respuesta
                        .status(HttpStatus.NOT_FOUND)
                        .json(new MensajeError({
                            code: 1001,
                            detail: 'Result undefined search filter',
                        })
                            .msj(`Driver no encontrado.`));
                }
                return respuesta
                    .status(HttpStatus.OK)
                    .json(driver);
            })
            .catch(e => {
                return respuesta
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json(new MensajeError(e).msj('Ocurrio un error al consultar el driver'));
            });
    }
}
