import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {Role} from './role';

@Injectable()
export class RoleService {
    constructor(private http: Http) {
    }

    getAllRoles(): Observable<Role[]> {
        return this.http.get('/admin/roles').map((res: Response) => res.json());
    }

    addRole(role: Role): Observable<Role> {
        return this.http.post('/admin/roles', role).map((res: Response) => res.json());
    }

    updateRole(role: Role): Observable<Role> {
        return this.http.put('/admin/roles', role).map((res: Response) => res.json());
    }

    deleteRole(id: number): Observable<Response> {
        return this.http.delete('/admin/roles/' + id);
    }
}
