import {ModuleWithProviders} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

import {AdminInputComponent} from './components/admin-input/admin-input.component'
import {UserComponent} from './components/user/user.component'
export const router: Routes = [
    {path :'', redirectTo:'user', pathMatch:'full'},
    {path:'admin',component: AdminInputComponent},
    {path:'user',component: UserComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);