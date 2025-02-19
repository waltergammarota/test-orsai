const strapi = require('@strapi/strapi');

module.exports = (req, res) => {
    if (!strapi.isLoaded) {
        strapi({ distDir: './build' }).start().then(() => {
            strapi.server.mount();
            console.log('Strapi is running...');
        });
    }

    strapi.server.emit('request', req, res);
};