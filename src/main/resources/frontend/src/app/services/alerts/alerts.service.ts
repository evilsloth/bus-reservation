import {Injectable} from '@angular/core';
import {Alert} from './alert';

@Injectable()
export class AlertsService {
    alerts: Alert[] = [];

    addAlert(alert: Alert) {
        this.alerts.push(alert);
    }

    removeAlert(alert: Alert) {
        this.alerts.splice(this.alerts.indexOf(alert), 1);
    }
}
