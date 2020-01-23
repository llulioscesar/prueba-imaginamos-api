import {Body, Controller, HttpStatus, Post, Put, Res} from '@nestjs/common';
import {CrearDriverDto} from './dto/crear-driver-dto';
import {DriverService} from './driver.service';
import {Response} from 'express';
import {MensajeError} from '../utils/MensajeError';

@Controller('driver')
export class DriverController {

    constructor(private driverServicio: DriverService) {}

    @Post()
    crear(@Body() crearDriverDto: CrearDriverDto, @Res() respuesta: Response) {
        this.driverServicio.crear(crearDriverDto)
            .then(driver => {
                return respuesta
                    .status(HttpStatus.CREATED)
                    .json(driver);
            })
            .catch(e => {
                return respuesta
                    .status(HttpStatus.FORBIDDEN)
                    .json(new MensajeError(e).msj('Ocurrio un error al crear el driver'));
            });
    }

    @Put(':id')
    actualizar(@Body() drive: CrearDriverDto) {
        return '';
    }
}
