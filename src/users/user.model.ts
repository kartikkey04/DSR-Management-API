import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
  } from 'sequelize-typescript';
  import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
  
  @Table({ tableName: 'users' })
  export class User extends Model<
    InferAttributes<User>, 
    InferCreationAttributes<User> 
  > {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: CreationOptional<string>;
  
    @Column({ unique: true, allowNull: false })
    declare email: string;
  
    @Column({ allowNull: false })
    declare password: string;
  
    @Column({ defaultValue: false })
    declare isVerified: boolean;
  
    @Column({ allowNull: true })
    declare name: string;
  
    @Column({ allowNull: true })
    declare profilePic: string;
  }
  