import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: 'report',
                loadChildren: () => import('../pages/report/report.module').then(m => m.ReportModule)
            },
            {
                path: 'admin',
                loadChildren: () => import('../pages/admin/admin.module').then(m => m.AdminModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule { }
