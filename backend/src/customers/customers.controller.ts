import { Controller, Get, Res, HttpCode, HttpStatus, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Response } from 'express';
import { async } from 'rxjs/internal/scheduler/async';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
    constructor(
        private readonly customerService: CustomersService,
    ) {}

    @Get('/:customerId')
    async getCustomer(@Res() res: Response, @Param('customerId') customerId: number) {
        const customer = await this.customerService.get(customerId);
        return res.status(HttpStatus.OK).json({
            success: true,
            customer,
        });
    }

    @Get('/')
    async getCustomers(@Res() res: Response) {
        const customers = await this.customerService.getAll();
        return res.status(HttpStatus.OK).json({
            success: true,
            customers,
        });
    }

    @Post('/')
    async insertCustomer(@Res() res: Response, @Body() createCustomer: CreateCustomerDTO) {
        this.customerService.insert(createCustomer);
        return res.status(HttpStatus.CREATED).send();
    }

    @Put('/:customerId')
    async saveCustomer(@Res() res: Response, @Param('customerId') customerId: number, createCustomer: CreateCustomerDTO) {
        const customer = this.customerService.update(customerId, createCustomer);

        return res.status(HttpStatus.OK).json({
            success: true,
            customer,
        });
    }

    @Delete('/:customerId')
    async deleteCustomer(@Res() res: Response, @Param('customerId') customerId: number) {
        this.customerService.delete(customerId);
        return res.status(HttpStatus.NO_CONTENT).send();
    }
}
