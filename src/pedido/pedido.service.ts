import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Pedido} from './entities/pedido.entity';
import {Repository, getConnection, getRepository} from 'typeorm';
import {CrearPedidoDto} from './dto/crear-pedido-dto';
import {Driver} from '../driver/entities/driver.entity';
import {Direccion} from '../direccion/entities/direccion.entity';
import moment = require('moment');

@Injectable()
export class PedidoService {

    constructor(
        @InjectRepository(Pedido)
        private readonly pedidoRepositorio: Repository<Pedido>,
    ) {}

    async crear(crearPedidoDto: CrearPedidoDto): Promise<Pedido> {

        let idDriver;

        try {
            idDriver = JSON.parse(JSON.stringify(await getConnection()
                .query(`select id from driver order by random() limit 1`)))[0].id;
        } catch (e) {
            throw e;
        }

        const direccion = new Direccion()
        direccion.id = crearPedidoDto.direccionId;

        const driver = new Driver()
        driver.id = idDriver;

        const nuevo = new Pedido();
        nuevo.driver = driver;
        nuevo.direccion = direccion;
        nuevo.fechaEntrega = crearPedidoDto.fechaEntrega;
        return await this.pedidoRepositorio.save(nuevo);
    }

    async actualizarHora(id: string, hora: string): Promise<Pedido> {
        const pedido = await this.pedidoRepositorio.findOne(id);
        pedido.horaEntrega = hora;
        return await this.pedidoRepositorio.save(pedido);
    }

    async calcularHoras(id: string): Promise<string[]> {
        const pedido = await this.pedidoRepositorio.findOne(id);
        const fecha = moment(pedido.fecha);

        const horas: string[] = [];
        for (let i = 0; i < 8; i++) {
            horas.push(fecha.add(1, 'hours').startOf('hours').format('hh:mm A'));
        }
        return horas;
    }

}
