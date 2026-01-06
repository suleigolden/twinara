import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateGoogleAuthDto } from './dto/create-google-auth.dto';
import { SendInvitationDto } from './dto/send-invitation.dto';
import { Response } from 'express';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Action } from '../common/ability/ability.types';
import { CheckAbilities } from '../common/ability/abilities.decorator';
import { AbilitiesGuard } from '../common/ability/abilities.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.create(createUserDto, res);
  }

  @ApiOperation({ summary: 'Signup with google' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @Post('google-auth')
  @HttpCode(HttpStatus.CREATED)
  googleSignUp(
    @Body() googleData: CreateGoogleAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.googleAuth(googleData, res);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities([Action.Manage, 'all'])
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Send invitations to multiple employees' })
  @ApiResponse({ status: 200, description: 'Invitations sent successfully' })
  @ApiResponse({ status: 400, description: 'Invalid invitation data' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('send-invitations')
  @HttpCode(HttpStatus.OK)
  async sendInvitations(
    @Body() body: {
      invitations: SendInvitationDto['invitations'];
      inviterId: string;
      organizationId: string;
      organizationName: string;
    }
  ) {
    const sendInvitationDto: SendInvitationDto = {
      invitations: body.invitations
    };
    
    return this.usersService.sendInvitations(
      sendInvitationDto,
      body.inviterId,
      body.organizationId,
      body.organizationName
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove invitation for an employee' })
  @ApiResponse({ status: 200, description: 'Invitation removed successfully' })
  @ApiResponse({ status: 404, description: 'Invitation not found' })
  @UseGuards(JwtAuthGuard)
  @Delete('remove-invitation/:invitationId')
  @HttpCode(HttpStatus.OK)
  async removeInvitation(@Param('invitationId') invitationId: string) {
    return this.usersService.removeInvitation(invitationId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get invited employees by organization' })
  @ApiResponse({ status: 200, description: 'Return invited employees' })
  @ApiResponse({ status: 404, description: 'No invited employees found' })
  @UseGuards(JwtAuthGuard)
  @Get('invited-employees/:organizationId')
  findInvitedEmployees(@Param('organizationId') organizationId: string) {
    return this.usersService.findInvitedEmployees(organizationId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'Return found user' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'User successfully updated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 204, description: 'User successfully deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities([Action.Manage, 'all'])
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({ status: 200, description: 'Password reset successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Post('reset-password')
  resetPassword(@Body() data: ResetPasswordDto) {
    return this.usersService.resetPassword(data);
  }

  @ApiOperation({ summary: 'Validate user setup status' })
  @ApiResponse({ status: 200, description: 'User status validated' })
  @Post('validate-setup-status')
  @HttpCode(HttpStatus.OK)
  async validateSetupStatus(@Body() body: { email: string; organizationId: string }) {
    return this.usersService.validateUserSetupStatus(body.email, body.organizationId);
  }

  @ApiOperation({ summary: 'Setup password for invited user' })
  @ApiResponse({ status: 200, description: 'Password setup successful' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Invalid temporary password' })
  @Post('setup-password')
  @HttpCode(HttpStatus.OK)
  async setupPassword(
    @Body() body: {
      email: string;
      tempPassword: string;
      newPassword: string;
      organizationId: string;
    }
  ) {
    return this.usersService.setupPassword(
      body.email,
      body.tempPassword,
      body.newPassword,
      body.organizationId,
    );
  }
}
