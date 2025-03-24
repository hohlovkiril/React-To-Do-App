import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity, MediaEntity, TaskEntity } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'todoapp',
      entities: [ColumnEntity, TaskEntity, MediaEntity],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
