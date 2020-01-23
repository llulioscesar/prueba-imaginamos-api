import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {Direccion} from '../../direccion/entities/direccion.entity';
import {Driver} from '../../driver/entities/driver.entity';

@Entity()
export class Pedido {

    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @Column({nullable: false, default: () => 'CURRENT_TIMESTAMP', type: 'time without time zone'})
    fecha: string;

    @Column({nullable: false, length: 10})
    @ApiProperty({nullable: false, format: 'YYYY-MM-DD', maxLength: 10, minLength: 10})
    fechaEntrega: string;

    @Column()
    @ApiProperty({required: false, nullable: true})
    horaEntrega: string;

    @OneToOne(type => Direccion)
    @JoinColumn()
    @ApiProperty()
    direccion: Direccion;

    @OneToOne(type => Driver)
    @JoinColumn()
    @ApiProperty()
    driver: Driver;

}
