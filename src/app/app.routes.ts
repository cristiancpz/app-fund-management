import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'funds',
    pathMatch: 'full'
  },
  {
    path: 'funds',
    loadComponent: () =>
      import('./features/funds/pages/funds-page/funds-page')
        .then(m => m.FundsPage)
  },
  {
    path: 'funds/my-funds',
    loadComponent: () =>
      import('./features/my-funds/pages/my-funds-page/my-funds-page')
        .then(m => m.MyFundsPage)
  },
  {
    path: 'transactions',
    loadComponent: () =>
      import('./features/historical/pages/historical-page/historical-page')
        .then(m => m.HistoricalPage)
  }
];
