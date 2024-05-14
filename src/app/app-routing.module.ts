import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {authGuard} from "./auth/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'quotes',
    pathMatch: 'full'
  },
  {
    path: 'quotes',
    loadChildren: () => import('./quotes/quotes.module').then( m => m.QuotesPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'fun-facts',
    loadChildren: () => import('./fun-facts/fun-facts.module').then( m => m.FunFactsPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'log-in',
    loadChildren: () => import('./auth/log-in/log-in.module').then( m => m.LogInPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
