import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/entities';
import { Repository } from 'typeorm';
import { ColumnService } from '../../column/providers/column.service';
import { TaskCreateDto, TaskGetManyDto, TaskUpdateDto } from 'src/dto';

@Injectable()
export class TaskService {
  private readonly logger: Logger = new Logger(TaskService.name);

  constructor(
    @InjectRepository(TaskEntity)
    private readonly repository: Repository<TaskEntity>,
    @Inject(forwardRef(() => ColumnService))
    private readonly columnService: ColumnService,
  ) {}

  public async findOneByIdOrNull(id: number): Promise<TaskEntity | null> {
    return await this.repository.findOne({
      where: {
        id,
      },
      relations: ['column', 'media'],
    });
  }

  public async findOneByIdOrFailed(id: number): Promise<TaskEntity> {
    const task = await this.findOneByIdOrNull(id);

    if (!task) {
      throw new NotFoundException(`Task with id: ${id} not found!`);
    }

    return task;
  }

  public async findMany(payload: TaskGetManyDto): Promise<TaskEntity[]> {
    return await this.repository.find({
      where: {
        column: payload.columnId
          ? await this.columnService.findOneByIdOrFailed(payload.columnId)
          : undefined,
      },
      relations: ['column', 'media'],
    });
  }

  public async create(payload: TaskCreateDto): Promise<TaskEntity> {
    const column = await this.columnService.findOneByIdOrFailed(
      payload.columnId,
    );
    const task = this.repository.create();
    task.title = payload.title;
    task.column = column;
    task.viewIndex = payload.viewIndex;

    return await this.repository.save(task);
  }

  public async update(id: number, payload: TaskUpdateDto): Promise<TaskEntity> {
    const task = await this.findOneByIdOrFailed(id);

    if (payload.columnId !== undefined) {
      const column = await this.columnService.findOneByIdOrFailed(
        payload.columnId,
      );

      task.column = column;
    }

    if (payload.title !== undefined) {
      task.title = payload.title;
    }

    if (payload.description !== undefined) {
      task.description = payload.description;
    }

    if (payload.viewIndex !== undefined) {
      task.viewIndex = payload.viewIndex;
    }

    if (payload.priority !== undefined) {
      task.priority = payload.priority;
    }

    if (payload.dueDate !== undefined) {
      task.dueDate = payload.dueDate;
    }

    return await this.repository.save(task);
  }

  public async remove(id: number): Promise<TaskEntity> {
    const task = await this.findOneByIdOrFailed(id);

    await this.repository.remove(task);

    return task;
  }
}
