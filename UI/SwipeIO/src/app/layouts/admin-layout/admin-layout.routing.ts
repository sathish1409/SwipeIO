import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { AddorremoveComponent } from '../../addorremove/addorremove.component';
import { ReportComponent } from '../../report/report.component';
import { EditComponent } from '../../edit/edit.component';
import { AddComponent } from 'app/add/add.component';
import {SettingsComponent} from '../../settings/settings.component';
import {ImportComponent} from '../../import/import.component'
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    {path:'report', component:ReportComponent},
    {path:'edit/:id', component:EditComponent},
    {path:'import',component:ImportComponent},
    {path:'add', component:AddComponent},
    {path:'settings',component:SettingsComponent},
    {path:'addorremove', component:AddorremoveComponent},
];
