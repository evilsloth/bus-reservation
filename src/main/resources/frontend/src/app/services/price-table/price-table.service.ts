import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {PriceTable} from './price-table';

@Injectable()
export class PriceTableService {
    constructor(private http: Http) {
    }

    getPriceTable(): Observable<PriceTable> {
        return this.http.get('/pricetable').map((res: Response) => res.json());
    }

    setPriceTable(priceTable: PriceTable): Observable<PriceTable> {
        return this.http.post('/admin/pricetable', priceTable).map((res: Response) => res.json());
    }
}
