/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "vxht4dqitzdrvlo",
    "created": "2024-02-11 05:36:20.090Z",
    "updated": "2024-02-11 05:36:20.090Z",
    "name": "department",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lcdhtwbb",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("vxht4dqitzdrvlo");

  return dao.deleteCollection(collection);
})
