import {Body, Controller, Get, HttpStatus, Param, Post, Put, Res} from '@nestjs/common';
import {CrearPedidoDto} from './dto/crear-pedido-dto';
import {ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiParam} from '@nestjs/swagger';
import {Pedido} from './entities/pedido.entity';
import {MensajeError} from '../utils/MensajeError';
import {ActualizarPedidoHoraDto} from './dto/actualizar-pedido-hora-dto';
import {PedidoService} from './pedido.service';
import {Response} from 'express';

@Controller('pedido')
export class PedidoController {

    constructor(private pedidoServicio: PedidoService) {}

    @Post()
    @ApiCreatedResponse({description: 'Se creo con exito el pedido', type: Pedido})
    @ApiInternalServerErrorResponse({description: 'Ocurrio un error al crear el pedido', type: MensajeError})
    crear(@Body() crearPedido: CrearPedidoDto, @Res() respuesta: Response) {
        this.pedidoServicio.crear(crearPedido)
            .then(pedido => {
                return respuesta
                    .status(HttpStatus.CREATED)
                    .json(pedido);
            })
            .catch(e => {
                // tslint:disable-next-line:no-console
                console.log(e);
                return respuesta
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json(new MensajeError(e).msj('Ocurrio un error al crear el pedido'));
            });
    }

    @Put(':id/hora')
    @ApiCreatedResponse({description: 'Se actualizo con exito la hora de entrega del pedido', type: Pedido})
    @ApiInternalServerErrorResponse({description: 'Ocurrio un error al actualizar la hora del pedido', type: MensajeError})
    @ApiParam({name: 'id', description: 'Id del pedido a actualizar', allowEmptyValue: false, required: true})
    actualizarHora(@Body() body: ActualizarPedidoHoraDto, @Res() respuesta: Response, @Param('id') id: string) {
        this.pedidoServicio.actualizarHora(id, body.hora)
            .then(pedido => {
                return respuesta
                    .status(HttpStatus.OK)
                    .json(pedido);
            })
            .catch(e => {
                return respuesta
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json(new MensajeError(e).msj('Ocurrio un error al actualizar la hora del pedido'));
            });
    }

    @Get(':id/calcular')
    @ApiOkResponse({description: 'Franja de horas para la entrega del pedido', type: String, isArray: true})
    @ApiInternalServerErrorResponse({description: 'Error al calcular la franja de horas', type: MensajeError})
    @ApiParam({name: 'id', description: 'Id del pedido a calcular las horas', required: true, allowEmptyValue: false})
    calcularHoras(@Res() respuesta: Response, @Param('id') id: string) {
        this.pedidoServicio.calcularHoras(id)
            .then(horas => {
                return respuesta
                    .status(HttpStatus.OK)
                    .json(horas);
            })
            .catch(e => {
                return respuesta
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json(new MensajeError(e).msj('Ocurrio un error al calcular la franja de horas del pedido'));
            });
    }
}
