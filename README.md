# zigmaFront

## Ambientes

- Local: `npm start`
- Desarrollo: `ng serve --proxy-config src/proxy.config.json`
- Produccion: `ng build --configuration production`

## Configuracion de entorno

- `src/environments/environment.ts` contiene la configuracion para ejecucion local o de desarrollo.
- `src/environments/environment.prod.ts` contiene la configuracion para produccion.
- El `angular.json` reemplaza `environment.ts` por `environment.prod.ts` al compilar con produccion.
