import {Component, OnInit} from '@angular/core';
import {AlertsService} from '../services/alerts/alerts.service';
import {Alert} from '../services/alerts/alert';

@Component({
    selector: 'app-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

    constructor(public alertsService: AlertsService) {
    }

    ngOnInit() {
    }

    closeAlert(alert: Alert) {
        this.alertsService.removeAlert(alert);
    }

}
