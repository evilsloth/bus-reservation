import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../services/user/user';
import {UserService} from '../services/user/user.service';
import {CaptchaService} from '../services/captcha/captcha.service';
import {Captcha} from '../services/captcha/captcha';
import {Response} from '@angular/http';
import {AlertsService} from '../services/alerts/alerts.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    userData: User = {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        phoneNumber: '',
        captcha: {
            id: 0,
            captcha: ''
        }
    };

    reapetedPassword = {value: ''};

    @ViewChild('captchaImage')
    captchaImage: ElementRef;

    constructor(private activeModal: NgbActiveModal, private userService: UserService,
                private captchaService: CaptchaService, private alertsService: AlertsService) {
    }

    ngOnInit() {
        this.showNewCaptcha();
    }

    refreshCaptcha() {
        this.showNewCaptcha();
    }

    showNewCaptcha() {
        this.captchaService.getCaptcha().subscribe((captcha: Captcha) => {
            this.userData.captcha.id = captcha.id;
            this.captchaImage.nativeElement.src = 'data:image/png;base64,' + captcha.captchaImage;
        });
    }

    registerUser(valid: boolean) {
        if (!valid) {
            return;
        }

        this.userService.register(this.userData).subscribe(() => {
            this.alertsService.addAlert({
                type: 'success',
                message: 'An e-mail has been send to you with activation link. ' +
                'You have to activate your e-mail address before you will be able to login.'
            });
            this.activeModal.dismiss();
        }, (error: Response) => {
            if (error.json && error.json().message === 'invalid_captcha') {
                this.showNewCaptcha();
                this.userData.captcha.captcha = '';
            }
        });
    }
}
