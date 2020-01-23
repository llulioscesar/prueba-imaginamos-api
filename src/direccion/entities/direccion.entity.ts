import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Cliente} from '../../cliente/entities/cliente.entity';

@Entity()
export class Direccion {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false, length: 55, type: 'character varying'})
    direccion: string;

    @ManyToOne(type => Cliente, cliente => cliente.direcciones)
    cliente: Cliente;

}
