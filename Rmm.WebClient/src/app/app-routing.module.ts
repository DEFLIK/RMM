import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-module/guards/auth.guard';

const routes: Routes = [
    { 
        path: 'devices', 
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./devicePanel-module/devices-panel.module').then(m => m.DevicesPanelModule)
    },
    { 
        path: 'auth', 
        loadChildren: () => import('./auth-module/auth.module').then(m => m.AuthModule) 
    },
    { 
        path: '**', 
        redirectTo: 'devices'
    }
];

@NgModule({
    imports: [        
        RouterModule.forRoot(
            routes, 
            { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
