import { Prisma } from '@prisma/client';
import db from '../db';

interface SchemaWidget {
    title: string,
    name: string,
    widget: string,
    default?: string,
}

export default function (title:string, widgets: SchemaWidget[]) {
    return db.schema.create({
        data: { title, widgets: widgets as unknown as Prisma.JsonArray }
    });
}