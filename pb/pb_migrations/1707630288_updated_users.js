/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_ZsAs7wi` ON `users` (`std_id`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "38c4hcxv",
    "name": "year",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "k9ivtowh",
    "name": "class",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.indexes = []

  // remove
  collection.schema.removeField("38c4hcxv")

  // remove
  collection.schema.removeField("k9ivtowh")

  return dao.saveCollection(collection)
})
