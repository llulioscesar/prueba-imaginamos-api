import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Direccion} from './entities/direccion.entity';
import {Repository} from 'typeorm';
import {CrearDireccionDto} from './dto/crear-direccion-dto';
import {Cliente} from '../cliente/entities/cliente.entity';

@Injectable()
export class DireccionService {

    constructor(
        @InjectRepository(Direccion)
        private readonly direccionRepositorio: Repository<Direccion>,
    ) {}

    async crear(crearDireccion: CrearDireccionDto): Promise<Direccion> {
        const cliente = new Cliente()
        cliente.id = crearDireccion.clienteId;

        const nuevo = new Direccion();
        nuevo.cliente = cliente;
        nuevo.direccion = crearDireccion.direccion;
        return await this.direccionRepositorio.save(nuevo);
    }

    async listar(): Promise<Direccion[]> {
        return await this.direccionRepositorio.find();
    }

}
