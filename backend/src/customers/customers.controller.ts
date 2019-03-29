import { Controller, Get, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Response } from 'express';

@Controller('customers')
export class CustomersController {
    constructor(
        private readonly customerService: CustomersService,
    ) {}

    @Get('/')
    async getCustomers(@Res() res: Response) {

        const customers = await this.customerService.getAllCustomers();
        return res.status(HttpStatus.OK).json({
            success: true,
            customers,
        })
    }
}
