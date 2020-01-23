import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Cliente} from './entities/cliente.entity';
import {Repository} from 'typeorm';
import {CrearClienteDto} from './dto/crear-cliente-dto';

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepositorio: Repository<Cliente>,
    ) {}

    async crear(clienteNuevo: CrearClienteDto): Promise<Cliente> {
        const nuevo = new Cliente();
        nuevo.nombre = clienteNuevo.nombre;
        nuevo.apellido = clienteNuevo.apellido;
        nuevo.correo = clienteNuevo.correo;
        nuevo.telefono = clienteNuevo.telefono;
        return await this.clienteRepositorio.save(nuevo);
    }

    async actualizar(id: string, cliente: CrearClienteDto): Promise<Cliente> {
        const clienteActualizar = await this.clienteRepositorio.findOne(id);
        clienteActualizar.nombre = cliente.nombre;
        clienteActualizar.apellido = cliente.apellido;
        clienteActualizar.correo = cliente.correo;
        clienteActualizar.telefono = cliente.telefono;
        return await this.clienteRepositorio.save(clienteActualizar);
    }
}
