import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('todos')
export class Todo {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  title: string;
}
