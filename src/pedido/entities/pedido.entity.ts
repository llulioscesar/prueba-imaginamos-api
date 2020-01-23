import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {Direccion} from '../../direccion/entities/direccion.entity';
import {Driver} from '../../driver/entities/driver.entity';

@Entity()
export class Pedido {

    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @Column({nullable: false, default: () => 'CURRENT_TIMESTAMP', type: 'timestamptz'})
    fecha: string;

    @Column({nullable: false, length: 10})
    @ApiProperty({nullable: false, format: 'YYYY-MM-DD', maxLength: 10, minLength: 10})
    fechaEntrega: string;

    @Column({nullable: true})
    @ApiProperty({required: false, nullable: true})
    horaEntrega: string;

    @Column({nullable: false, default: false})
    @ApiProperty({nullable: true, required: false})
    entregado: boolean

    @ManyToOne(type => Direccion, direccion => direccion.id, {nullable: false, onDelete: 'CASCADE'})
    direccion: Direccion;

    @ManyToOne(type => Driver, driver => driver.pedidos, {nullable: false, onDelete: 'CASCADE'})
    driver: Driver;

}
