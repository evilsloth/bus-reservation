import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ScheduleComponent} from './schedule/schedule.component';
import {ActivateAccountComponent} from './activate-account/activate-account.component';
import {AdminComponent} from './admin/admin.component';
import {AdminGuard} from './services/http/admin-guard.service';
import {MyTicketsComponent} from './my-tickets/my-tickets.component';

const appRoutes: Routes = [
    { path: 'schedule', component: ScheduleComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
    { path: 'activate-account', component: ActivateAccountComponent },
    { path: 'tickets', component: MyTicketsComponent },
    { path: '',   redirectTo: '/schedule', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
