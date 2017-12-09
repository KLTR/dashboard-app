import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminInputComponent} from './components/admin-input/admin-input.component';
import {UserComponent} from './components/user/user.component';
import {LoginComponent} from './components/login/login.component';
import {TrendingComponent} from './components/trending/trending.component';
import {ChartsComponent} from './components/charts/charts.component';

export const router: Routes = [
    {path : '', redirectTo: 'user', pathMatch: 'full'},
    {path: 'admin', component: AdminInputComponent},
    {path: 'analyst', component: AdminInputComponent},
    {path: 'trending', component: TrendingComponent},    
    {path: 'charts', component: ChartsComponent},    
    {path: 'user', component: UserComponent},
    {path: 'login', component: LoginComponent}

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
