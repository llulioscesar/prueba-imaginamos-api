import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Direccion} from '../../direccion/entities/direccion.entity';
import {ApiProperty} from '@nestjs/swagger';

@Entity()
export class Cliente {

    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @Column({nullable: false, length: 55, type: 'character varying'})
    @ApiProperty({maxLength: 55, nullable: false})
    nombre: string;

    @Column({nullable: false, length: 55, type: 'character varying'})
    @ApiProperty({maxLength: 55, nullable: false})
    apellido: string;

    @Column({unique: true, nullable: false, length: 55, type: 'character varying'})
    @ApiProperty({maxLength: 55, nullable: false})
    correo: string;

    @Column({nullable: true, type: 'character varying', length: 10})
    @ApiProperty({required: false, nullable: true, maxLength: 10, minLength: 7})
    telefono: string;

    @OneToMany(type => Direccion, direccion => direccion.cliente)
    @ApiProperty({nullable: true, required: false})
    direcciones: Direccion[];

}
