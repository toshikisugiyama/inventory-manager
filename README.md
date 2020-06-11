# Inventory Manager

> Inventory Management Service

## Environment
- Docker 19.03.8
- docker-compose 1.25.5
- php 7.4.5
- Composer 1.10.6
- [Laravel Framework 6.18.15](https://readouble.com/laravel/6.x/en/)
- node v12.16.3
- npm 6.14.5
- vue 2.6.11
- vue-router 3.1.6
- vuex 3.4.0
- typescript 3.8.3


## Starting

### Builds, creates, starts, and attaches to containers for a service in the background

```
docker-compose up -d
```

### Start searver in web container

```
docker-compose exec web php artisan --host 0.0.0.0 --port 80
```

### NPM run watch

```
docker-compose exec web npm run watch-poll
```

Then access http://localhost:3000

## Component's path

|Path|Name|Component|
|:--|:--|:--|
|/|materialItems|Materials|
|/:materialId|materialItem|Material|
|/edit/:materialId|editMaterialItem|MaterialEdit|
|/edit/confirm/:materialId|confirmEditMaterialItem|MaterialEditConfirm|
|/add|addMaterialItem|MaterialAdd|
|/add/confirm|confirmAddMaterialItem|MaterialAddConfirm|
|/:materialId/consume/:inventoryId|consumeInventoryItem|InventoryConsume|
|/:materialId/consume/confirm/:inventoryId|consumeConfirmInventoryItem|InventoryConsumeConfirm|
|/:materialId/add|addInventoryItem|InventoryAdd|
|/:materialId/add/confirm|confirmAddInventoryItem|InventoryAddConfirm|
|/login|login|Login|
|/500|error|SystemError|