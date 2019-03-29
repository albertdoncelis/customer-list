import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { Connection } from 'typeorm';
import { Customer } from 'src/entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // imports: [DatabaseModule],
  controllers: [CustomersController],
  imports: [
    TypeOrmModule.forFeature([Customer]),
  ],
})
export class CustomersModule {}
