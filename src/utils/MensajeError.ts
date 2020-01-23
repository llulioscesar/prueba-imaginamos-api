import {ApiProperty} from '@nestjs/swagger';

export class MensajeError {

    @ApiProperty({required: false})
    private mensaje: string

    @ApiProperty()
    private codigo: string | number;

    @ApiProperty()
    private causa: string;

    constructor(error: any) {
        this.codigo = error.code;
        this.causa = error.detail || error.message;
    }

    msj(value: string) {
        this.mensaje = value;
        return this;
    }
}
