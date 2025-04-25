import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/users/user.model';  

@Table
export class Dsr extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column
  content: string;

  @Column
  hours: number;

  @Column
  date: Date;

  
}
