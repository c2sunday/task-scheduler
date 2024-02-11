/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vxht4dqitzdrvlo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4ezqr2jy",
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
  const collection = dao.findCollectionByNameOrId("vxht4dqitzdrvlo")

  // remove
  collection.schema.removeField("4ezqr2jy")

  return dao.saveCollection(collection)
})
