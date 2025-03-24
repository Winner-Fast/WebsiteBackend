import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import {Expense} from '../../expenses/entities/expense.entity';
@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 10 ,nullable: false })
    firstName: string;

    @Column({ length:10 ,nullable: false })
    lastName: string;
  
    @Column({ unique: true ,nullable: false })
    email: string;

    @Column({nullable: false})
    password: string;

    @Column({ type: 'enum', enum: ['admin','user'], default: 'user'})
    role: string;

    @Column({type: 'enum', enum: ['verified', 'unverified'], default: 'unverified'})
    status: string;

    @Column({ nullable: true })
    otp: string;

    @Column('json', { nullable: true })
    devices: { deviceId: string; deviceType: string; os: string }[];

    @OneToMany(() => Expense, (expense) => expense?.userId)
    expenses: Expense[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
