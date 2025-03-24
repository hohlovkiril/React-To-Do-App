import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskService } from '../providers/task.service';
import { TaskCreateDto, TaskGetManyDto, TaskUpdateDto } from 'src/dto';

@Controller('task')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Get(':id')
  public async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOneByIdOrFailed(id);
  }

  @Get()
  public async getMany(@Query() dto: TaskGetManyDto) {
    return await this.service.findMany(dto);
  }

  @Post()
  public async create(@Body() dto: TaskCreateDto) {
    return await this.service.create(dto);
  }

  @Patch(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: TaskUpdateDto,
  ) {
    console.log(dto);
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  public async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.service.remove(id);
  }
}
