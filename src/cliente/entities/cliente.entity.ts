import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({nullable: false, length: 55, type: 'character varying'})
    nombre: string;
    @Column({nullable: false, length: 55, type: 'character varying'})
    apellido: string;
    @Column({unique: true, nullable: false, length: 55, type: 'character varying'})
    correo: string;
    @Column({nullable: false, type: 'character varying'})
    telefono: string;
}
