# VirtualShop [BACKEND] => TEST CondorLabs

[Ver app funcionando](http://www.virtual-shop.tk)
, [Ver Api funcionando](http://181.48.223.134:1234/product)
, [Frontend de la app](https://github.com/Sebastiakk/store)

Esta api utiliza NodeJs con Express para las apis y Mysql2 para la conexión a la base de datos 
## Primero clona del repositorio

```python
git clone https://github.com/Sebastiakk/store-backend.git
```
 
## Instalación 

Muévete al directorio donde clonaste y dentro de la carpeta ejecuta el siguiente comando para descargar las dependencias del proyecto

```bash
$ npm i
```

## Como usar

```python
Ejecutamos  =>                $ node index.js
o           =>                $ nodemon index.js
o           =>                $ pm2 start index.js

Valida primero que los tengas instalados
```

Asegúrate que en el archivo "store-backend/app/configs/constants.js" estenlas credenciales correctas de la base de datos, en el repositorio clonado hay una SQL de la base de datos,

El puerto que esta preestablecido es el 1234, lo puedes cambiar si deseas, pero recuerda que también tienes que cambiarlo en el frontend


Listo, la app se abre por si sola en el navegador, si no lo hace ingresa a 

http://localhost:1234/


## URLs

```python

[GET]  =>                $ http://localhost:1234/product
[GET]  =>                $ http://localhost:1234/product/category/:id
[GET]  =>                $ http://localhost:1234/product/:id
[GET]  =>                $ http://localhost:1234/product/related/:id
[GET]  =>                $ http://localhost:1234/categories
[POST]  =>               $ http://localhost:1234/cart/products
[PUT]  =>                $ http://localhost:1234/cart/products
[GET]  =>                $ http://localhost:1234/brand
[GET]  =>                $ http://localhost:1234/brand/products/:id

```
