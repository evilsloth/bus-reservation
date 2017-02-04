import {Injectable, Injector} from '@angular/core';
import {
    Http,
    Request,
    RequestOptionsArgs,
    Response,
    ConnectionBackend,
    RequestOptions,
    Headers,
    XHRBackend
} from '@angular/http';
import {Observable} from 'rxjs';
import {API_URL} from '../../config/app-config';
import {TranslateService} from 'ng2-translate';
import {AlertsService} from '../alerts/alerts.service';
import {UserService} from '../user/user.service';
import {Router} from '@angular/router';

export function authHttpFactory(backend: XHRBackend, options: RequestOptions, injector: Injector,
                                alertsService: AlertsService, router: Router) {
    return new AuthHttp(backend, options, injector, alertsService, router);
}

@Injectable()
export class AuthHttp extends Http {
    constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions, private injector: Injector,
                private alertsService: AlertsService, private router: Router) {
        super(_backend, _defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        if (typeof url === 'string') {
            url = this.extendUrl(<string>url);
            this.extendOptions(options);
        } else {
            (<Request>url).url = this.extendUrl((<Request>url).url);
            this.extendOptions(<Request>url);
        }

        return super.request(url, options).catch(this.catchError.bind(this));
    }

    private extendUrl(url: string) {
        if (!/^https?:\/\//.test(url) && url.indexOf('i18n') < 0) {
            url = API_URL + (url.startsWith('/') ? '' : '/') + url;
        }
        return url;
    }

    private extendOptions(options?: RequestOptionsArgs) {
        options = options || {};
        options.headers = options.headers || new Headers();

        if (!options.headers.has('Content-Type')) {
            options.headers.append('Content-Type', 'application/json');
        }

        let translate: TranslateService = this.injector.get(TranslateService);
        options.headers.append('Accept-Language', translate.currentLang);

        let userService: UserService = this.injector.get(UserService);
        let currentUser = userService.getCurrentUser();
        if (currentUser) {
            options.headers.append('Authorization', 'Bearer ' + currentUser.access_token);
        }

        return options;
    }

    private handleResponse(res: Response) {

    }

    private catchError(error: Response, caught: Observable<any>): Observable<Response> {
        let errorObject = error.json();
        let translate: TranslateService = this.injector.get(TranslateService);

        if (errorObject && errorObject.error === 'invalid_grant') {
            translate.get('invalid_login_or_password').subscribe((message: string) => {
                this.alertsService.addAlert({type: 'danger', message: message});
            });
            return Observable.throw(error);
        }

        if (error.status === 401) {
            let userService: UserService = this.injector.get(UserService);
            userService.logout();
            this.router.navigate(['/']);
            translate.get('not_authenticated_message').subscribe((message: string) => {
                this.alertsService.addAlert({type: 'danger', message: message});
            });

            return Observable.throw(error);
        }

        translate.get(errorObject.message || 'unknown_error').subscribe((message: string) => {
            this.alertsService.addAlert({type: 'danger', message: message});
        });

        return Observable.throw(error);
    }
}
