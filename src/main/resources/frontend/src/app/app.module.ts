import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Injector} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RegisterComponent} from './register/register.component';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from 'ng2-translate';
import {authHttpFactory} from './services/http/auth-http.service';
import {UserService} from './services/user/user.service';
import {AlertsService} from './services/alerts/alerts.service';
import {AlertsComponent} from './alerts/alerts.component';
import {CaptchaService} from './services/captcha/captcha.service';
import {ScheduleComponent} from './schedule/schedule.component';
import {AppRoutingModule} from './app-routing.module';
import {ActivateAccountComponent} from './activate-account/activate-account.component';
import {AdminComponent} from './admin/admin.component';
import {AdminGuard} from './services/http/admin-guard.service';
import {UsersAdminComponent} from './admin/users-admin/users-admin.component';
import {TicketsAdminComponent} from './admin/tickets-admin/tickets-admin.component';
import { RolesAdminComponent } from './admin/roles-admin/roles-admin.component';
import {RoleService} from './services/role/role.service';
import { PriceTableAdminComponent } from './admin/price-table-admin/price-table-admin.component';
import {PriceTableService} from './services/price-table/price-table.service';
import {Router} from '@angular/router';
import { ConnectionsAdminComponent } from './admin/connections-admin/connections-admin.component';
import {ConnectionsService} from './services/connections/connections.service';
import {Ng2DatetimePickerModule} from 'ng2-datetime-picker';
import {TicketsService} from './services/tickets/tickets.service';
import {TicketConfirmationComponent} from './ticket-confirmation/ticket-confirmation.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        AlertsComponent,
        ScheduleComponent,
        ActivateAccountComponent,
        AdminComponent,
        UsersAdminComponent,
        TicketsAdminComponent,
        RolesAdminComponent,
        PriceTableAdminComponent,
        ConnectionsAdminComponent,
        TicketConfirmationComponent,
        MyTicketsComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        SharedModule,
        Ng2DatetimePickerModule,
        NgbModule.forRoot(),
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [Http]
        })
    ],
    entryComponents: [RegisterComponent, RolesAdminComponent, TicketConfirmationComponent],
    providers: [
        UserService,
        AlertsService,
        CaptchaService,
        AdminGuard,
        RoleService,
        PriceTableService,
        ConnectionsService,
        TicketsService,
        {
            provide: Http,
            useFactory: authHttpFactory,
            deps: [XHRBackend, RequestOptions, Injector, AlertsService, Router]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
