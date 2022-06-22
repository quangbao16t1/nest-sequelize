import { Table, Column, Model } from 'sequelize-typescript';

@Table({tableName: 'roles'})
export class Role extends Model {
  @Column({
    primaryKey: true
  })
  id: number;

  @Column
  name: string;
}
