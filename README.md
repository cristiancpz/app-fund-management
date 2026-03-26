# Fondos FPV / FIC — BTG

Aplicación web para la gestión de fondos de inversión (FPV y FIC). Permite al usuario consultar fondos disponibles, suscribirse a ellos, cancelar participaciones y revisar el historial de transacciones.

---

## Tecnologías

| Tecnología | Versión |
|---|---|
| Angular | 21.2 |
| TypeScript | 5.9 |
| RxJS | 7.8 |
| Vitest | 4.x |
| Prettier | 3.x |
| Node / npm | >= 18 / 11.x |

---

## Requisitos previos

- Node.js >= 18
- npm >= 11 (`npm install -g npm@11`)
- Angular CLI (`npm install -g @angular/cli`)

---

## Instalación y ejecución

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd app-funds-management

# Instalar dependencias
npm install

# Servidor de desarrollo (http://localhost:4200)
npm start

# Build de producción
npm run build

# Ejecutar tests
npm test
```

---

## Rutas de la aplicación

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | — | Redirige a `/funds` |
| `/funds` | `FundsPage` | Lista de fondos disponibles |
| `/funds/my-funds` | `MyFundsPage` | Fondos activos del usuario |
| `/transactions` | `HistoricalPage` | Historial de transacciones |

Todas las rutas usan **lazy loading** mediante `loadComponent`.

---

## Arquitectura

### Patrón general

```
Feature-based architecture + Shared modules
```

La app se divide en **features** independientes y un módulo **shared** con elementos reutilizables. Cada feature encapsula sus propias páginas, componentes, servicios e interfaces.

### Estructura de carpetas

```
src/
├── styles.scss                   # Design tokens globales + clases compartidas
└── app/
    ├── app.ts                    # Componente raíz
    ├── app.routes.ts             # Rutas con lazy loading
    ├── app.config.ts             # Proveedores de Angular (HTTP, Router)
    │
    ├── features/
    │   ├── funds/                # Feature: Fondos disponibles
    │   │   ├── pages/
    │   │   │   └── funds-page/
    │   │   ├── components/
    │   │   │   └── subscription-modal/
    │   │   ├── services/
    │   │   │   ├── fund-api.ts           # Capa HTTP
    │   │   │   └── fund-use-case.ts      # Lógica de negocio
    │   │   ├── interfaces/
    │   │   └── const/
    │   │
    │   ├── my-funds/             # Feature: Mis fondos activos
    │   │   └── pages/
    │   │       └── my-funds-page/
    │   │
    │   └── historical/           # Feature: Historial de transacciones
    │       └── pages/
    │           └── historical-page/
    │
    └── shared/
        ├── components/
        │   ├── sidebar/              # Navegación principal
        │   └── modal-alert/          # Modal de confirmación/alerta global
        ├── services/
        │   ├── user-state.service.ts     # Estado global del usuario
        │   └── modal-alert.service.ts    # Control de la modal global
        ├── interfaces/
        ├── consts/
        └── utils/
            └── format-money.utils.ts
```

---

## Decisiones de diseño

### Angular Signals

Todo el estado se maneja con **Angular Signals** (`signal`, `computed`, `asReadonly`). No se usa NgRx ni BehaviorSubject. Los signals expuestos desde los servicios son `readonly` para evitar mutaciones externas.

```typescript
private readonly _balance = signal<number>(this.loadBalance());
readonly balance          = this._balance.asReadonly();
readonly balanceFormatted = computed(() => formatMoney(this._balance()));
```

### Persistencia con localStorage

`UserStateService` persiste automáticamente en `localStorage` el saldo, los fondos activos y el historial. Al refrescar la página el estado se restaura sin necesidad de backend.

```
localStorage keys:
  balance       → saldo disponible del usuario
  activeFunds   → fondos en los que está suscrito
  transactions  → historial de movimientos
```

### Separación HTTP / UseCase / Component

La capa de datos sigue el patrón **API → UseCase → Component**:

- `FundApi` — realiza la llamada HTTP, retorna `Observable`
- `FundUseCase` — transforma los datos y expone un `signal` al componente
- `FundsPage` — consume el signal, no conoce nada de HTTP

### Componentes standalone

Todos los componentes son **standalone** sin NgModules. Las dependencias se declaran en el array `imports` del decorador `@Component`.

### Lazy loading

Cada ruta carga su página con `loadComponent`, reduciendo el bundle inicial:

```typescript
{
  path: 'funds',
  loadComponent: () => import('./features/funds/pages/funds-page/funds-page').then(m => m.FundsPage)
}
```

### Design Tokens + BEM

Los colores, radios y superficies se definen como **CSS custom properties** en `:root` dentro de `styles.scss`. Los componentes usan variables, no valores hardcodeados.

Todos los tokens están definidos en `src/styles.scss` bajo `:root`.

Los estilos de componentes siguen la metodología **BEM** (Block\_\_Element--Modifier).

---

## Flujo de estado del usuario

El usuario inicia con un saldo de **$500.000 COP** (configurable en `shared/consts/balance.const.ts`).

```
Suscripción a fondo  →  descuenta monto del saldo  →  registra transacción tipo SUBSCRIPTION
Cancelar fondo       →  devuelve monto al saldo     →  registra transacción tipo CANCELATION
```

Cada operación persiste automáticamente en `localStorage`.

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Servidor de desarrollo en `localhost:4200` |
| `npm run build` | Build optimizado para producción |
