import {OnInit, Component} from '@angular/core';
import {AlertsService} from '../services/alerts/alerts.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user/user.service';

@Component({
    selector: 'app-activate-account',
    template: '<h3>Activating account, please wait...</h3>'
})
export class ActivateAccountComponent implements OnInit {
    constructor(private alertsService: AlertsService, private router: Router, private route: ActivatedRoute,
                private userService: UserService) {

    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            let hash = params['h'];
            this.userService.activate(hash).subscribe(() => {
                this.alertsService.addAlert({
                    type: 'success',
                    message: 'Account activation was successfull. You can login now!'
                });
                this.router.navigate(['/']);
            }, () => {
                this.router.navigate(['/']);
            });
        });
    }

}
