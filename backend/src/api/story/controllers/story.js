'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::story.story', ({ strapi }) => ({
    async find(ctx) {
        const { data, meta } = await super.find(ctx);

        const enhancedData = await Promise.all(
            data.map(async (story) => {
                const votes = await strapi.entityService.findMany('api::vote.vote', {
                    filters: { story: story.id },
                });

                const totalVotes = votes.length;
                console.log('votes', votes);
                const averageRating = totalVotes > 0
                    ? votes.reduce((sum, vote) => sum + vote.rating, 0) / totalVotes
                    : 0;

                return {
                    ...story,
                    statistics: {
                        totalVotes,
                        averageRating,
                    },
                };
            })
        );

        return { data: enhancedData, meta };
    },

    async findOne(ctx) {
        const { data, meta } = await super.findOne(ctx);

        const votes = await strapi.entityService.findMany('api::vote.vote', {
            filters: { story: data.id },
        });

        const totalVotes = votes.length;
        const averageRating = totalVotes > 0
            ? votes.reduce((sum, vote) => sum + vote.rating, 0) / totalVotes
            : 0;

        return {
            data: {
                ...data,
                statistics: {
                    totalVotes,
                    averageRating,
                },
            },
            meta,
        };
    },
}));