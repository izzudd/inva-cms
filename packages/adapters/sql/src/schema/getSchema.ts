import db from '../db';

export default (id: number) => db.schema.findFirst({
    where: { id }
});