import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor(private readonly environment: string) {
        this.envConfig = dotenv.parse(fs.readFileSync('.env'));
    }

    get(key: string): string {
        return this.envConfig[key];
    }

    get isDevelopment(): boolean {
        return this.environment.toLowerCase() !== 'production';
    }
}
