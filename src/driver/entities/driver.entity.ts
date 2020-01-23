import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';

@Entity()
export class Driver {

    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({nullable: false, maxLength: 55})
    id: string;

    @Column({nullable: false, length: 55, type: 'character varying'})
    @ApiProperty()
    nombre: string;

    @Column({nullable: false, length: 55, type: 'character varying'})
    @ApiProperty({nullable: false, maxLength: 55})
    apellido: string;

    @Column({default: true, nullable: false, type: 'bool'})
    @ApiProperty({nullable: false, required: false, default: true})
    activo: boolean;

}
