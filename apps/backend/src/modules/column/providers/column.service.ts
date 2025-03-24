import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnCreateDto, ColumnUpdateDto } from 'src/dto';
import { ColumnEntity } from 'src/entities';
import { Not, Repository } from 'typeorm';

@Injectable()
export class ColumnService {
  private readonly logger: Logger = new Logger(ColumnService.name);

  constructor(
    @InjectRepository(ColumnEntity)
    private readonly repository: Repository<ColumnEntity>,
  ) {}

  public async findOneByIdOrNull(id: number): Promise<ColumnEntity | null> {
    return await this.repository.findOne({
      where: {
        id,
      },
      relations: ['task'],
    });
  }

  public async findOneByIdOrFailed(id: number): Promise<ColumnEntity> {
    const column = await this.findOneByIdOrNull(id);

    if (!column) {
      throw new NotFoundException(`Column with id: ${id} not found!`);
    }

    return column;
  }

  public async findMany(): Promise<ColumnEntity[]> {
    return await this.repository.find({
      where: {},
      relations: ['task'],
    });
  }

  public async create(payload: ColumnCreateDto): Promise<ColumnEntity> {
    const checkTitle = await this.repository.findOneBy({
      title: payload.title,
    });

    if (checkTitle) {
      throw new BadRequestException(
        `Column with title: ${payload.title} already exists!`,
      );
    }

    const newColumn = this.repository.create();
    newColumn.title = payload.title;
    newColumn.viewIndex = payload.viewIndex;

    return await this.repository.save(newColumn);
  }

  public async update(
    id: number,
    payload: ColumnUpdateDto,
  ): Promise<ColumnEntity> {
    const column = await this.findOneByIdOrFailed(id);

    if (payload.title !== undefined) {
      const checkTitle = await this.repository.findOneBy({
        id: Not(id),
        title: payload.title,
      });

      if (checkTitle) {
        throw new BadRequestException(
          `Column with title: ${payload.title} already exists!`,
        );
      }

      column.title = payload.title;
    }

    if (payload.viewIndex !== undefined) {
      column.viewIndex = payload.viewIndex;
    }

    return await this.repository.save(column);
  }

  public async remove(id: number): Promise<ColumnEntity> {
    const column = await this.findOneByIdOrFailed(id);

    await this.repository.remove(column);

    return column;
  }
}
