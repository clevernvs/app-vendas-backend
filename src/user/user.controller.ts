import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './interfaces/User.entity';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {

    };

    @Get()
    async getAll(): Promise<UserEntity[]> {
        return this.userService.getAll();
    };

    @Post()
    async create(@Body() createUser: CreateUserDTO): Promise<UserEntity> {
        return this.userService.create(createUser);

    };
}
