import {
    Entity,
    Column,
    Index,
  } from 'typeorm';
  import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
  import { BaseEntity } from '@shared/entities/base.entity';
  
  export enum UserRole {
    SUPER_ADMIN = 'SUPER_ADMIN',
    COMPANY_ADMIN = 'COMPANY_ADMIN',
    EMPLOYEE = 'EMPLOYEE',
  }
  
  export enum UserStatus {
    PENDING = 'PENDING',
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
  }
  
  registerEnumType(UserRole, { name: 'UserRole' });
  registerEnumType(UserStatus, { name: 'UserStatus' });
  
  @ObjectType()
  @Entity('users')
  export class User extends BaseEntity {
    @Field()
    @Index()
    @Column({ unique: true })
    email: string;
  
    @Field({ nullable: true })
    @Column({ nullable: true })
    name?: string;
  
    @Field({ nullable: true })
    @Column({ nullable: true })
    profileImage?: string;
  
    @Field(() => UserRole)
    @Column({ type: 'enum', enum: UserRole })
    role: UserRole;
  
    @Field(() => UserStatus)
    @Column({ type: 'enum', enum: UserStatus, default: UserStatus.PENDING })
    status: UserStatus;
  
    @Column({ nullable: true })
    passwordHash?: string;
  
    @Field({ nullable: true })
    @Column({ nullable: true })
    slackId?: string;
  
    @Field({ nullable: true })
    @Column({ nullable: true })
    title?: string;
  
    @Field({ nullable: true })
    @Column({ nullable: true })
    level?: string;
  
    @Field({ nullable: true })
    @Column({ type: 'timestamptz', nullable: true })
    lastActiveAt?: Date;
  }
  