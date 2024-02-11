/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6bv87xgssp615mq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "papvyjyb",
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
  const collection = dao.findCollectionByNameOrId("6bv87xgssp615mq")

  // remove
  collection.schema.removeField("papvyjyb")

  return dao.saveCollection(collection)
})
