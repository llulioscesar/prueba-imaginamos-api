import {ApiProperty} from '@nestjs/swagger';

export class CrearPedidoDto {

    @ApiProperty()
    readonly direccionId: string;

    @ApiProperty()
    readonly fechaEntrega: string;
}
