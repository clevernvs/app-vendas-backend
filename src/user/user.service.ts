import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/User.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {


    }

    async getAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async create(createUserDTO: CreateUserDTO): Promise<UserEntity> {
        const saltOrRounds = 10;
        const passwordHashed = await hash(createUserDTO.password, saltOrRounds);

        return this.userRepository.save({
            ...createUserDTO,
            password: passwordHashed,
        });
    }
}
