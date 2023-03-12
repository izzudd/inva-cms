# InvaCMS SQL Adaper

Use this adapter to connect InvaCMS with MySQL or PostgreSQL backend database.

## Usage

Work in progress

## Specifications

### Schema (class)

1. `getSchemas()`
2. `getSchema(schemaId: number)`
3. `createNewSchema(schema: SchemaSpec)`
4. `updateSchema(schemaId: number, schema: SchemaSpec => SchemaSpec)`
5. `deleteSchema(schemaId: numebr)`

### Data (class)

1. `getData(schemaId: number, whereClause: object)`
2. `getDatas(schemaId: number, whereClause: object)`
3. `createNewData(schemaId: number, data: SchemaModel)`
4. `updateData(schemaId: numebr, whereClause: object, data: SchemaModel => SchemaModel)`
5. `deleteData(schemaId: number, whereClause: object)`
