import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {User} from './user';
import {Observable} from 'rxjs';
import {UserToken} from './user-token';
import {AUTH_URL} from '../../config/app-config';
import {Authority} from './authority';
import {UserFull} from './user-full';

@Injectable()
export class UserService {
    private static AUTH_CLIENT_HEADER = 'Basic YnVzcmVzZXJ2YXRpb24tZnJvbnQtYXBwOnNlY3JldDEyMzQ=';
    private static STORAGE_TOKEN_KEY = 'USER_TOKEN';
    private currentUserToken: UserToken;

    constructor(private http: Http) {

    }

    login(email: string, password: string): Observable<UserToken> {
        let headers = new Headers();
        headers.append('Authorization', UserService.AUTH_CLIENT_HEADER);

        const authUrl = AUTH_URL + '/oauth/token?grant_type=password&username=' + email + '&password=' + password;
        return this.http.post(authUrl, null, {headers: headers})
            .map((res: Response) => {
                let token = res.json();
                token.login = email;
                this.saveUserToken(token);
                return token;
            });
    }

    logout() {
        localStorage.removeItem(UserService.STORAGE_TOKEN_KEY);
        this.currentUserToken = null;
    }

    saveUserToken(token) {
        localStorage.setItem(UserService.STORAGE_TOKEN_KEY, JSON.stringify(token));
    }

    getCurrentUser(): UserToken {
        if (!this.currentUserToken) {
            this.currentUserToken = this.getUserFromStorage();
        }
        return this.currentUserToken;
    }

    getUserFromStorage(): UserToken {
        let token = localStorage.getItem(UserService.STORAGE_TOKEN_KEY);
        return JSON.parse(token);
    }

    isUserAuthenticated(): boolean {
        return !!this.getCurrentUser();
    }

    register(user: User): Observable<Response> {
        return this.http.post('/users/register', user);
    }

    activate(hash: string): Observable<any> {
        return this.http.get('/users/confirm?h=' + hash);
    }

    userHasPermission(permission: string): boolean {
        return this.isUserAuthenticated()
            && !!this.getCurrentUser().authorities.find((auth: Authority) => auth.authority === permission);
    }

    getAllUsers(): Observable<UserFull[]> {
        return this.http.get('/admin/users').map((res: Response) => res.json());
    }

    deleteUser(id: number): Observable<Response> {
        return this.http.delete('/admin/users/' + id);
    }

    updateUser(user: UserFull): Observable<Response> {
        return this.http.put('/admin/users', user);
    }
}
