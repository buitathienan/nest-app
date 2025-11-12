import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseFilters,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { FobiddenException } from 'src/exceptions/fobidden.exception';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';
import { RolesGuard } from 'src/guards/role.guard';
import { Role } from 'src/decorators/role.decorator';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';

@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @Role(['admin'])
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  @UseInterceptors(LoggingInterceptor)
  findAll(
    @Query('pages', new DefaultValuePipe(1), ParseIntPipe) pages: number,
  ) {
    return this.catsService.findAll();
  }

  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  findOne(@Param('id') id: string) {
    throw new HttpException('Request not allowed', HttpStatus.BAD_REQUEST);
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    throw new FobiddenException();
    return `This action removes a #${id} cat`;
  }
}
