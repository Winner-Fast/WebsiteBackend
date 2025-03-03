import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
  
    @Column({ type: 'timestamp', nullable: true })
    otpExpiresAt: Date;

    @Column('json', { nullable: true })
    devices: { deviceId: string; deviceType: string; os: string }[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
