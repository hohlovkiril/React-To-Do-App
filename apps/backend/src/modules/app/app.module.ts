import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ColumnModule } from '../column/column.module';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [DatabaseModule, ColumnModule, TaskModule],
})
export class AppModule {}
