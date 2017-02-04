import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Captcha} from './captcha';
import {Observable} from 'rxjs';
import {API_URL} from '../../config/app-config';

@Injectable()
export class CaptchaService {
    constructor(private http: Http) {

    }

    getCaptcha(): Observable<Captcha> {
        return this.http.get('/captcha').map((res: Response) => res.json());
    }
}
