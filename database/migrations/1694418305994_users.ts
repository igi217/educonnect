import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.text("university")
      table.text("department")
      table.text("first_name")
      table.text("last_name")
      table.text("country")
      table.text("avatar")
      table.text("cover_image")
      table.text('bio')
      table.text("github")
      table.text("facebook")
      table.text("twitter")
      table.text("linkedin")
      table.boolean("email_verified")
      table.boolean("status")
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
