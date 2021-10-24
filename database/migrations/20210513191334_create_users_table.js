export function up(knex)
  {     
    return knex.schema.createTable("users", table => {
        table.increments('id').primary();
        table.string('username',255).notNullable();
        table.string('first_name',255).notNullable();
        table.string('midle_name',255).notNullable();
        table.string('last_name',255).notNullable();
        table.string('phone').notNullable().unique();
        table.string('email').notNullable().unique();
        table.string('password',255).defaultTo('password');
        table.string('pofile_url',255).nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });     
}

export function down(knex) { return knex.schema.dropTableIfExists("users"); }
