import {ApiProperty} from '@nestjs/swagger';

export class CrearDireccionDto {

    @ApiProperty()
    readonly clienteId: string;

    @ApiProperty()
    readonly direccion: string;
}
