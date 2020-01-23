export class MensajeError {

    private mensaje: string
    private codigo: string | number;
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
