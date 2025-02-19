'use strict';

// const { faker } = require('@faker-js/faker');
// const OpenAI = require('openai');

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// async function generateStoryContent() {
//     try {
//         const completion = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: [
//                 { role: "system", content: "You are a creative writer. Generate a short story of about 3 paragraphs." },
//                 { role: "user", content: "Write a short story." }
//             ],
//         });
//         return completion.choices[0].message.content.trim();
//     } catch (error) {
//         console.error("Error generating story with OpenAI:", error);
//         return faker.lorem.paragraphs(3); // Fallback to faker if OpenAI fails
//     }
// }

// async function generateStoryTitle(content) {
//     try {
//         const completion = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: [
//                 { role: "system", content: "You are a title generator. Generate a short, catchy title for the given story." },
//                 { role: "user", content: `Generate a title for this story: ${content.substring(0, 100)}...` }
//             ],
//         });
//         return completion.choices[0].message.content.trim();
//     } catch (error) {
//         console.error("Error generating title with OpenAI:", error);
//         return faker.lorem.sentence(); // Fallback to faker if OpenAI fails
//     }
// }

// async function setPublicPermissions(strapi) {
//     const publicRole = await strapi
//         .query('plugin::users-permissions.role')
//         .findOne({ where: { type: 'public' } });

//     const contentTypes = strapi.contentTypes;
//     const permissions = [
//         'find',
//         'findOne',
//         'create',
//         'update',
//         'delete',
//         'count',
//     ];

//     for (const contentType in contentTypes) {
//         if (!contentType.startsWith('api::')) continue;

//         await strapi.query('plugin::users-permissions.permission').update({
//             where: {
//                 action: { $startsWith: `${contentType}.` },
//                 role: publicRole.id,
//             },
//             data: {
//                 enabled: true,
//             },
//         });
//     }

//     console.log('Permisos públicos configurados correctamente.');
// }

// async function clearExistingData(strapi) {
//     console.log('Eliminando datos existentes...');

//     // Eliminar votos
//     await strapi.db.query('api::vote.vote').deleteMany({
//         where: {},
//     });

//     // Eliminar historias
//     await strapi.db.query('api::story.story').deleteMany({
//         where: {},
//     });

//     // Eliminar estudiantes
//     await strapi.db.query('api::student.student').deleteMany({
//         where: {},
//     });

//     console.log('Datos existentes eliminados.');
// }

// module.exports = async ({ strapi }) => {
//     console.log('Iniciando script de bootstrap...');

//     if (process.env.NODE_ENV === 'development') {
//         // Eliminar datos existentes
//         // await clearExistingData(strapi);

//         // Verificar si ya existen datos
//         const studentsCount = await strapi.db.query('api::student.student').count();
//         if (studentsCount > 0) {
//             console.log('Ya existen datos en la base de datos.');
//             return;
//         }

//         console.log('Generando nuevos datos...');

//         const students = [];
//         for (let i = 0; i < 10; i++) {
//             const student = await strapi.entityService.create('api::student.student', {
//                 data: {
//                     name: faker.person.fullName(),
//                     email: faker.internet.email(),
//                 },
//             });
//             students.push(student);
//         }

//         const stories = [];
//         for (let i = 0; i < 20; i++) {
//             const content = await generateStoryContent();
//             const title = await generateStoryTitle(content);
//             const story = await strapi.entityService.create('api::story.story', {
//                 data: {
//                     title: title,
//                     content: content,
//                     author: students[Math.floor(Math.random() * students.length)].id,
//                     publishedAt: faker.date.past(),
//                 },
//             });
//             stories.push(story);
//         }

//         for (let i = 0; i < 100; i++) {
//             await strapi.entityService.create('api::vote.vote', {
//                 data: {
//                     rating: faker.number.int({ min: 1, max: 5 }),
//                     student: students[Math.floor(Math.random() * students.length)].id,
//                     story: stories[Math.floor(Math.random() * stories.length)].id,
//                 },
//             });
//         }

//         console.log('Nuevos datos generados exitosamente!');
//     } else {
//         console.log('No se ejecuta la generación de datos en modo producción.');
//     }

//     await setPublicPermissions(strapi);

//     console.log('Script de bootstrap completado.');
// };