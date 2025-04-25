import { Controller, Delete, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { S3Service } from './s3.service';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { jwtGuard } from 'src/guards/jwt-guard';
import { request } from 'http';

@ApiBearerAuth("JWT")
@UseGuards(jwtGuard)
@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  private generateKey(file: Express.Multer.File): string {
    return `uploads/${new Date().toISOString().slice(0, 7)}/${uuidv4()}${path.extname(file.originalname)}`;
  }

  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload file directly to S3' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async uploadFile(@UploadedFile() file: Express.Multer.File,@Req() request) {
    const key = this.generateKey(file);
    return await this.s3Service.uploadFile(file, key,request.user);
  }

 
  @Delete('delete/:key')
  @ApiOperation({ summary: 'Delete file from S3' })
  @ApiParam({ name: 'key', description: 'S3 object key to delete' })
  @ApiResponse({ status: 200, description: 'File deleted successfully' })
  @ApiResponse({ status: 404, description: 'File not found' })
  async deleteFile(@Param('key') key: string,@Req() request) {
    return await this.s3Service.deleteFile(key,request.user); // Fixed: was calling itself recursively
  }


  @Post('presigned-upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Generate pre-signed URL for client-side upload' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File metadata for URL generation',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Pre-signed URL generated',
    schema: {
      type: 'object',
      properties: {
        message: {type: 'string'},
        url: { type: 'string' },
        key: { type: 'string' },
      },
    },
  })
  async getSignedUploadUrl(@UploadedFile() file: Express.Multer.File,@Req() request) {
    const key = this.generateKey(file);
      return await this.s3Service.getSignedUploadUrl(key, 300, file.mimetype,request.user)
    };

  
  @Get('presigned-delete/:key')
  @ApiOperation({ summary: 'Generate pre-signed URL for client-side deletion' })
  @ApiParam({ name: 'key', description: 'S3 object key to delete' })
  @ApiResponse({ 
    status: 200, 
    description: 'Pre-signed delete URL generated',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string'},
        url: { type: 'string' },
        key: { type:'string'}
      },
    },
  })
  async getSignedDeleteUrl(@Param('key') key: string,@Req() request) {
    return await this.s3Service.getSignedDeleteUrl(key, 300,request.user)
  }
}