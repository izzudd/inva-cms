import { Prisma, Schema } from '@prisma/client';
import db from '../db';
import getSchema from './getSchema';

export default function (id: number, edit: (schema: Schema) => Schema) {
    const schema = getSchema(id);
}