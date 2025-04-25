export const configuration = () => {
    return Object.freeze({
        DB_HOST: process.env['DB_HOST'],
        DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
        DB_NAME: process.env['DB_NAME'],
        DB_USER: process.env['DB_USER'],
        DB_PASSWORD: process.env['DB_PASSWORD'],
        JWT_SECRET: process.env['JWT_SECRET'],
        JWT_EXPIRY:process.env['JWT_EXPIRY'],
        REDIS_HOST:process.env['REDIS_HOST'],
        REDIS_PORT:process.env['REDIS_PORT'],
        REDIS_TTL:process.env['REDIS_TTL'],
        region: process.env.AWS_REGION,
        accessKeyId: process.env.ACESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        bucketName: process.env.BUCKET_NAME
    })
  }