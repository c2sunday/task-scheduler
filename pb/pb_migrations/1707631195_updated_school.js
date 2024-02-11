/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fjckpriw6kgpy86")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6cnlns6k",
    "name": "semester",
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
  const collection = dao.findCollectionByNameOrId("fjckpriw6kgpy86")

  // remove
  collection.schema.removeField("6cnlns6k")

  return dao.saveCollection(collection)
})
