/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "fjckpriw6kgpy86",
    "created": "2024-02-11 05:58:32.346Z",
    "updated": "2024-02-11 05:58:32.346Z",
    "name": "school",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lzu61qrl",
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
  const collection = dao.findCollectionByNameOrId("fjckpriw6kgpy86");

  return dao.deleteCollection(collection);
})
