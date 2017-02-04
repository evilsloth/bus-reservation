import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RegisterComponent} from './register/register.component';
import {TranslateService} from 'ng2-translate';
import {Title} from '@angular/platform-browser';
import {UserService} from './services/user/user.service';
import {UserToken} from './services/user/user-token';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private login = {
        email: '',
        password: ''
    };

    constructor(private modalService: NgbModal, private translate: TranslateService, private titleService: Title,
                private userService: UserService, private router: Router) {
        translate.setDefaultLang('en');
        translate.use(localStorage.getItem('language') || window.navigator.language);
        translate.onLangChange.subscribe(() => {
            translate.get('appTitle').subscribe((title) => this.setAppTitle(title));
        });

    }

    setAppTitle(appTitle) {
        this.titleService.setTitle(appTitle);
    }

    openRegisterModal() {
        this.modalService.open(RegisterComponent);
    }

    changeLanguage(code: string) {
        localStorage.setItem('language', code);
        this.translate.use(code);
    }

    loginUser() {
        if (this.login.email && this.login.password) {
            this.userService.login(this.login.email, this.login.password).subscribe((token: UserToken) => {
                this.login = {
                    email: '',
                    password: ''
                };
            });
        }
    }

    logout() {
        this.userService.logout();
        this.router.navigate(['/']);
    }
}
