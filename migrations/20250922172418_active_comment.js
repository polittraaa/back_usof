
export async function up(knex) {
  await knex.schema.alterTable('comments', (table) => {
    table
      .enu('target_state', ['active', 'inactive']) // MySQL inline enum
      .notNullable()
      .defaultTo('active');
  });
}

export async function down(knex) {
  await knex.schema.alterTable('comments', (table) => {
    table.dropColumn('target_state');
  });
}
