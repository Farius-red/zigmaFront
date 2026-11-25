# zigmaFront

## Login y carrito (desarrollo local)

La aplicacion reutiliza el login, carrito, CRUD y dialogo de `common-lib-angular`.
La rama del frontal es `fix-levante`, siguiendo `origin/fix-levante`.

- La configuracion de endpoints esta en `src/environments/environment.ts`,
  inyectada mediante `LIB_COMMON_CONFIG` desde `AppModule`.
- Usuarios: `http://localhost:1212/user`; login directo: `POST /login`;
  Facebook: `POST /login/social`, despues de obtener el token del SDK.
- Completar `commonConfig.facebookAppId` con el App ID publico de Facebook.
  Debe coincidir con el configurado en Usuarios y permitir el origen del frontal.
  No colocar el App Secret en Angular. Mientras el App ID este vacio, el login
  social muestra un error explicito; el login directo sigue disponible.
- `AppModule` registra el estado de usuarios de la libreria e inicializa su
  inyector antes de renderizar las paginas. El login admite respuestas heredadas
  con `rta=false` cuando contienen un token operativo.
- Al consumir la libreria desde su codigo fuente, los aliases `@ngxs/store`,
  sus subrutas y plugins en `tsconfig.json` deben apuntar al `node_modules` del
  frontal, igual que en fn-admin. Esto evita dos instancias de Store y el error
  `No provider found for InjectionToken NGXS_OPTIONS`. Si el servidor activo no
  recoge cambios de aliases, reiniciarlo y recargar la pagina completa.
- El carrito usa `CarritoState`, acciones genericas y DTOs de
  `@juliaosistem/core-dtos`. El usuario y negocio se obtienen del `businessToken`,
  no de valores fijos. No se conserva un carrito de otra sesion.
- Se usan `GET /carrito/all?idUsuario=...`, `POST /carrito/add`,
  `PUT /carrito/:id` y `DELETE /carrito/:id`. La tabla y edicion de cantidad
  reutilizan `lib-crud` y `lib-crud-dialog1`.
- Catalogo, detalle y productos relacionados envian los cambios al mismo carrito.
  Los clics rapidos se procesan en orden. Se reutiliza el descuento del catalogo,
  sin aplicarlo nuevamente al editar cantidades. El detalle consulta productos
  reales si no estan en NGXS; no sustituye errores por productos ficticios.
- El checkout carga `GET /MedioDepago/all` y envia
  `POST /carrito` con `{ idCarrito, medioPagoId }`. Sin medios configurados no
  permite confirmar. Confirmar **no significa pago aprobado**, no inicia una
  pasarela y no vacia el carrito.
- El contrato actual de confirmacion del micro reutiliza `DefaultService.add`
  con el ID de un carrito existente. Si responde "ya existe" o falla, el frontal
  muestra ese rechazo sin simular un pedido ni un cobro exitoso. La creacion de
  pedidos/pagos requiere soporte real del backend.
- Las URLs de produccion son relativas al mismo origen; el proxy de despliegue
  debe enrutar `/user`, `/carrito` y `/MedioDepago` a los micros correspondientes.

## Validacion

Se agregaron pruebas de regresion del login y de `CarritoState` en la libreria.
No se ejecutaron builds, pruebas ni scripts por indicacion del usuario.
Los servicios de desarrollo deben mantenerse levantados por el usuario
(frontal 8100, negocio 3000 y usuarios 1212).
