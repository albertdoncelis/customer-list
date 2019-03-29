import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'customers' })
export class Customer {

    @PrimaryColumn()
    id: number;

    @Column({ name: 'first_name'})
    firstName: string;

    @Column({name: 'last_name'})
    lastName: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    description: string;

    @Column({name: 'is_deleted', default: 0, type: 'boolean' })
    isDeleted: boolean;

    @CreateDateColumn({name: 'created_at', type: 'datetime'})
    createdAt: Date;

    @CreateDateColumn({name: 'updated_at', type: 'datetime'})
    updatedAt: Date;

}
