import db from '../db';

export default (id: number) => db.schema.delete({
    where: { id }
});