import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IUser } from './interfaces/user.interface';

@Entity()
export class User {
  private readonly saltRounds: number;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  profession: string;

  @Column()
  licenseNumber: string;

  @Column()
  phone: string;

  @Column({ default: true })
  isActive: boolean;

  @BeforeInsert()
  async hashPassword() {
    try {
      const salt = await bcrypt.genSalt(this.saltRounds);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
      throw new Error(err);
    }
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject(): IUser {
    const {
      id,
      name,
      email,
      profession,
      licenseNumber,
      phone,
      isActive
    } = this;

    const responseObject: IUser = {
      id,
      name,
      email,
      profession,
      licenseNumber,
      phone,
      isActive,
    };

    return responseObject;
  }
}
