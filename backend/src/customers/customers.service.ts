import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from 'src/entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) {}
}
