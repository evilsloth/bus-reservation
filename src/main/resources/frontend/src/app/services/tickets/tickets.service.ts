import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {Ticket} from './ticket';

@Injectable()
export class TicketsService {
    constructor(private http: Http) {
    }

    bookTicket(connectionId: number): Observable<Ticket> {
        return this.http.post('/tickets/book/' + connectionId, null).map((res: Response) => res.json());
    }

    cancelBookTicket(tikcetId): Observable<Response> {
        return this.http.delete('/tickets/' + tikcetId + '/cancel');
    }

    getAllUserTickets(): Observable<Ticket[]> {
        return this.http.get('/tickets').map((res: Response) => res.json());
    }

    getAllTickets(): Observable<Ticket[]> {
        return this.http.get('/admin/tickets').map((res: Response) => res.json());
    }

    deleteTicket(id: number): Observable<Response> {
        return this.http.delete('/admin/tickets/' + id);
    }
}
