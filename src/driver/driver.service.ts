import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Driver} from './entities/driver.entity';
import {Repository} from 'typeorm';
import {CrearDriverDto} from './dto/crear-driver-dto';

@Injectable()
export class DriverService {

    constructor(
        @InjectRepository(Driver)
        private readonly driverRepositorio: Repository<Driver>
    ) {}

    async crear(driver: CrearDriverDto): Promise<Driver> {
        const nuevo = new Driver();
        nuevo.activo = driver.activo;
        nuevo.apellido = driver.apellido;
        nuevo.nombre = driver.nombre;
        return await this.driverRepositorio.save(nuevo);
    }

    async actualizar(id: string, driver: CrearDriverDto): Promise<Driver> {
        const driverActualizar = await this.driverRepositorio.findOne(id);
        driverActualizar.nombre = driver.nombre;
        driverActualizar.apellido = driver.apellido;
        driverActualizar.activo = driver.activo;
        return await this.driverRepositorio.save(driverActualizar);
    }

}
