'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::vote.vote', ({ strapi }) => ({
    async find(ctx) {
        const { data, meta } = await super.find(ctx);

        const allVotes = await strapi.entityService.findMany('api::vote.vote', {});
        const totalVotes = allVotes.length;
        const averageRating = totalVotes > 0
            ? allVotes.reduce((sum, vote) => sum + vote.rating, 0) / totalVotes
            : 0;

        const ratingDistribution = allVotes.reduce((acc, vote) => {
            acc[vote.rating] = (acc[vote.rating] || 0) + 1;
            return acc;
        }, {});

        return {
            data,
            meta: {
                ...meta,
                statistics: {
                    totalVotes,
                    averageRating,
                    ratingDistribution,
                },
            },
        };
    },
}));