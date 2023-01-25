import {
  ColumnType,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CoreEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export function setColumnType(type: string | ColumnType) {
  const sqliteTypeMapping: {
    [key: string]: ColumnType;
  } = {
    timestamp: 'datetime',
    bigint: 'integer',
    char: 'text',
    varchar: 'text',
    tinyint: 'integer',
  };
  return sqliteTypeMapping[type.toString()] || type;
}
