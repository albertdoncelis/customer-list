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
        return this.customerRepository.find();
    }

    async get(customerId: number): Promise<Customer> {
        return this.customerRepository.findOne(customerId);
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
}
