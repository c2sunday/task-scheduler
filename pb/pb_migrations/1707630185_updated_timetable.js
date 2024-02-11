/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6bv87xgssp615mq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "m8wqno1c",
    "name": "timetable_img",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6bv87xgssp615mq")

  // remove
  collection.schema.removeField("m8wqno1c")

  return dao.saveCollection(collection)
})
