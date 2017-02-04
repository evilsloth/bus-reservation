import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Connection} from './connection';
import {Observable} from 'rxjs';

@Injectable()
export class ConnectionsService {
    constructor(private http: Http) {
    }

    getAllConnections(): Observable<Connection[]> {
        return this.http.get('/connections').map((res: Response) => res.json());
    }

    addConnection(connection: Connection): Observable<Connection> {
        return this.http.post('/admin/connections', connection).map((res: Response) => res.json());
    }

    updateConnection(connection: Connection): Observable<Connection> {
        return this.http.put('/connections', connection).map((res: Response) => res.json());
    }

    removeConnection(id: number): Observable<Response> {
        return this.http.delete('/admin/connections/' + id);
    }
}
