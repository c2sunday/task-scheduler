/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dxxd6tawvseu970")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "geadopid",
    "name": "is_teacher",
    "type": "bool",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dxxd6tawvseu970")

  // remove
  collection.schema.removeField("geadopid")

  return dao.saveCollection(collection)
})
