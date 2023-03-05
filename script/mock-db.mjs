import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import slugify from 'slugify'

const prisma = new PrismaClient();
const dataCount = 10;

async function mockDB(){
    for (let i = 0; i < dataCount; i++) {
        const author = await prisma.user.create({data: {
            name: faker.name.fullName(),
            username: faker.internet.userName(),
            picture: faker.image.avatar(),
        }})

        const serieTitle = faker.word.adjective() + ' ' + faker.word.noun()
        const serie = await prisma.series.create({data: {
            title: serieTitle,
            slug: slugify(serieTitle)
        }})

        for (let j = 0; j < dataCount / 2; j++) {
            const tags = []

            for (let i=0; i<3; i++){
                const tag = faker.word.noun();
                tags.push({title: tag, slug: slugify(tag)})
            }

            const title = faker.lorem.sentence()
            const content = faker.lorem.paragraphs(5)

            await prisma.post.create({data: {
                title, content,
                slug: slugify(title),
                author: {
                    connect: {id: author.id}
                },
                series: {
                    connect: {id: serie.id}
                },
                tags: {
                    create: tags
                }              
            }})
        }
    }
}

mockDB()