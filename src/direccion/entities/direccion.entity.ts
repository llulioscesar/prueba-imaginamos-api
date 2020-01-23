import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Cliente} from '../../cliente/entities/cliente.entity';
import {ApiProperty} from '@nestjs/swagger';
import {Pedido} from '../../pedido/entities/pedido.entity';
import {ApiModelProperty} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

@Entity()
export class Direccion {

    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @Column({nullable: false, length: 55, type: 'character varying'})
    @ApiProperty({nullable: false, maxLength: 55})
    direccion: string;

    @ManyToOne(type => Cliente, cliente => cliente.direcciones)
    cliente: Cliente;

    @OneToMany(type => Pedido, pedido => pedido.direccion)
    @ApiModelProperty()
    pedidos: Pedido[];

}
