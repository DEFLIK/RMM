import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-module/guards/auth.guard';

const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    { 
        path: 'devices', 
        canLoad: [AuthGuard],
        loadChildren: () => import('./devicePanel-module/devices-panel.module').then(m => m.DevicesPanelModule)
    },
    { 
        path: 'auth', 
        loadChildren: () => import('./auth-module/auth.module').then(m => m.AuthModule) 
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
