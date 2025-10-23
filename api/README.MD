--Instalar consola de nest cli
pnpm i -g @nestjs/cli


-----DENTRO DE API-----
--Instalar dotenv para las variables de entorno
cd api
pnpm i --save dotenv

--Crear nueva api dentro de api
nest new api

--Para iniciar
npm run start:dev

--Para crear recurso
nest g resource resourceName

-----FIN DENTRO DE API------