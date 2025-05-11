export default () => ({
    port: parseInt(process.env.PORT || '3000', 10),
    baseUrl: process.env.BASE_URL, // ✅ burası eklendi


    database: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432', 10),
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        name: process.env.DB_NAME,
    },

    redis: {
        url: process.env.REDIS_URL,
    },

    slack: {
        clientId: process.env.SLACK_CLIENT_ID,
        clientSecret: process.env.SLACK_CLIENT_SECRET,
        signingSecret: process.env.SLACK_SIGNING_SECRET,
    },

    jwt: {
        secret: process.env.JWT_SECRET,
    },
});
