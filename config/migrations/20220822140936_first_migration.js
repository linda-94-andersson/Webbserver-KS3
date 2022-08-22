/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = async function (knex) {
	await knex.schema.createTable("rooms", (table) => {
		table.increments("id");
		table.string("room").notNullable();
	});

    await knex.schema.createTable("users", (table) => {
        table.increments("id");
        table.string("username");
        table.string("active_room"); 
    });

	await knex.schema.createTable("messages", (table) => {
		table.increments("id");
		table.text("message").notNullable();
		table.string("room_name").notNullable();
		table.string("id_user").notNullable();
		table.string("username");
        table.string("date"); 
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.down = async function (knex) {
	await knex.schema.dropTable("messages");

    await knex.schema.dropTable("users"); 

	await knex.schema.dropTable("rooms");
};
