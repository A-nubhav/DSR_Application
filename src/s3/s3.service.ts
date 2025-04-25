
import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, S3ClientConfig } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';


@Injectable()
export class S3Service {

    private readonly s3Client : S3Client;
    private readonly bucketName;

    constructor(private readonly configService: ConfigService) {
        this.bucketName = this.configService.get<string>('aws.bucketName');
        this.s3Client = new S3Client({
            region: this.configService.get<string>('aws.region'),
            credentials: {
                accessKeyId: this.configService.get<string>('aws.accessKeyId') || process.env.acceskeyId,
                secretAccessKey: this.configService.get<string>('aws.secretAccessKey') || process.env.secretAccessKey
            }
        } as S3ClientConfig);
    }

    async uploadFile(file: Express.Multer.File, key: string): Promise<any>{
        console.log(key);
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype
        });

        await this.s3Client.send(command);
        
        return {
            url:`https://${this.bucketName}.s3.amazonaws.com/${key}`,
            message: "File Uploaded Successfully!!",
            key
        }
    }

    async deleteFile(key: string): Promise<any> {
        
        const command = new DeleteObjectCommand({
            Bucket: this.bucketName,
            Key: key
        });

        await this.s3Client.send(command);
        return {message: "File Deleted Successfully!!"}
    }

    async getSignedUploadUrl(key: string, expiresIn: number, content: string): Promise<any>{

        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            ContentType: content
        })

        const url = await getSignedUrl(this.s3Client, command, {expiresIn});
        return { message: "URL Generated Successfully", url, key}
    }

    async getSignedDeleteUrl(key: string, expiresIn: number): Promise<any> {
        
        const command = new DeleteObjectCommand({
            Bucket: this.bucketName,
            Key: key,
        })

        const url = await getSignedUrl(this.s3Client, command, {expiresIn});
        return { message: "URL Generated Successfully", url, key}
    }

    async getFileBuffer(key: string): Promise<Buffer> {
        
        const command = new GetObjectCommand({
            Bucket: this.bucketName,
            Key: key
        })

        const response = await this.s3Client.send(command);
        const Bytes = await response.Body?.transformToByteArray();
        if(Bytes)
            return Buffer.from(Bytes);
        return Buffer.from('')
    }
}