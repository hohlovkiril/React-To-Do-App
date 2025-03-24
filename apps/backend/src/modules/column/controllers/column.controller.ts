import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ColumnService } from '../providers/column.service';
import { ColumnCreateDto, ColumnUpdateDto } from 'src/dto';

@Controller('column')
export class ColumnController {
  constructor(private readonly service: ColumnService) {}

  @Get(':id')
  public async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOneByIdOrFailed(id);
  }

  @Get()
  public async getMany() {
    return await this.service.findMany();
  }

  @Post()
  public async create(@Body() dto: ColumnCreateDto) {
    return await this.service.create(dto);
  }

  @Patch(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ColumnUpdateDto,
  ) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  public async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.service.remove(id);
  }
}
