import {ApiProperty} from '@nestjs/swagger';

export class CrearClienteDto {

    @ApiProperty()
    readonly nombre: string;

    @ApiProperty()
    readonly apellido: string;

    @ApiProperty()
    readonly correo: string;

    @ApiProperty({required: false})
    readonly telefono: string;
}
