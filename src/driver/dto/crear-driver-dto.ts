import {ApiProperty} from '@nestjs/swagger';

export class CrearDriverDto {

    @ApiProperty()
    readonly nombre: string;

    @ApiProperty()
    readonly apellido: string;

    @ApiProperty({required: false, default: true})
    readonly activo: boolean;
}
