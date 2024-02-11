/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dxxd6tawvseu970")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qqlfxxl1",
    "name": "school",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "fjckpriw6kgpy86",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dxxd6tawvseu970")

  // remove
  collection.schema.removeField("qqlfxxl1")

  return dao.saveCollection(collection)
})
