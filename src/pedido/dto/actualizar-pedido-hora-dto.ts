import {ApiProperty} from '@nestjs/swagger';

export class ActualizarPedidoHoraDto {
    @ApiProperty()
    readonly hora: string;
}
