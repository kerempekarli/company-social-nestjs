import * as Joi from 'joi';

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string().valid('dev', 'staging', 'prod').required(),

    PORT: Joi.number().default(3000),

    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(5432),
    DB_USER: Joi.string().required(),
    DB_PASS: Joi.string().required(),
    DB_NAME: Joi.string().required(),

    REDIS_URL: Joi.string().required(),

    SLACK_CLIENT_ID: Joi.string().required(),
    SLACK_CLIENT_SECRET: Joi.string().required(),
    SLACK_SIGNING_SECRET: Joi.string().required(),

    JWT_SECRET: Joi.string().required(),
    BASE_URL: Joi.string().uri().required(), // ✅ burası eklendi

});
