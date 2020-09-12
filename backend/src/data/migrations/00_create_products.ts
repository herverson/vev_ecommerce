import knex from 'knex';

export async function up(knex: knex) {
  return knex.schema.createTable('products', table => {
    table.uuid('id').primary();
    table.string('title').notNullable;
    table.string('description').notNullable;
    table.decimal('price').notNullable;
    table.string('images').notNullable;
    table.integer('quantity').notNullable;
  })
}

export async function down(knex: knex) {
  return knex.schema.dropTable('products');
}