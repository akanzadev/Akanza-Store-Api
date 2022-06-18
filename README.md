# Backend Store

Api de ecommerce con envio de email

Para instalar las dependencias:

```nodejs
npm install
```

Para levantar los contenedores:

```docker
docker-compose up -d
```

Crear una archivo llamado .env bastara con copiar el contenido de .env.example.
Esta ubicado en utils/envs/

```bash
cp utils/envs/.example.env utils/envs/.env
```

Esperar un par de minutos mientras se levantan los servicios de Docker
Luego realizar las migraciones:

```nodejs
npm run migrations:run
```

Para ejecutar aplicación en modo de desarrollo:

```nodejs
npm run start:dev
```
