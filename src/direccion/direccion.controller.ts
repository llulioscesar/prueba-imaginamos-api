import {Body, Controller, Post} from '@nestjs/common';
import {CrearDireccionDto} from './dto/crear-direccion-dto';

@Controller('direccion')
export class DireccionController {

    @Post()
    crear(@Body() direccion: CrearDireccionDto) {
        return '';
    }

}
