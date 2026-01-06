import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { AbilityModule } from '../common/ability/ability.module';
import { EmailModule } from '../email/email.module';
import { OrganizationModule } from '../organization/organization.module';
import { Organization } from '../organization/entities/organization.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Organization]),
    forwardRef(() => AuthModule),
    AbilityModule,
    forwardRef(() => EmailModule),
    forwardRef(() => OrganizationModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
