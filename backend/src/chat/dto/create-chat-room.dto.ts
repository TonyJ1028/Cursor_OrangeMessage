import { IsString, IsBoolean, IsOptional, IsArray, IsUUID } from 'class-validator';

export class CreateChatRoomDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isGroup?: boolean;

  @IsArray()
  @IsUUID('4', { each: true })
  participantIds: string[];
} 