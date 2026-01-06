import { IsEmail, IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class InvitationData {
  @ApiProperty({ example: 'john.doe@company.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;
}

export class SendInvitationDto {
  @ApiProperty({ 
    type: [InvitationData],
    description: 'Array of employee invitations to send',
    example: [
      {
        email: 'john.doe@company.com',
        firstName: 'John',
        lastName: 'Doe'
      },
      {
        email: 'jane.smith@company.com',
        firstName: 'Jane',
        lastName: 'Smith'
      }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvitationData)
  invitations: InvitationData[];
}
