import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from 'src/entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) {}

    async getAll(): Promise<Customer[]> {
        return this.customerRepository.find({ where: {
           isDeleted: false,
        }});
    }

    async get(customerId: number): Promise<Customer> {
        return this.customerRepository.findOne(customerId, {
            where: {
                isDeleted: false,
            },
        });
    }

    async insert({ firstName, lastName, email, phone, description, address }: CreateCustomerDTO): Promise<void> {
        const customer = new Customer();
        customer.firstName = firstName;
        customer.lastName = lastName;
        customer.address = address;
        customer.email = email;
        customer.phone = phone;
        customer.description = description;
        this.customerRepository.save(customer);
    }

    async update(customerId: number,
                 { firstName, lastName, email, phone, description, address }: CreateCustomerDTO): Promise<Customer> {
        const customer = await this.customerRepository.findOne(customerId);
        customer.firstName = firstName;
        customer.lastName = lastName;
        customer.address = address;
        customer.email = email;
        customer.phone = phone;
        customer.description = description;
        customer.updatedAt = new Date();
        return await this.customerRepository.save(customer);
    }

    async delete(customerId: number): Promise<Customer> {
        const customer = await this.customerRepository.findOne(customerId);
        customer.isDeleted = true;
        customer.updatedAt = new Date();
        return this.customerRepository.save(customer);
    }
}
