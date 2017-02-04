import {Component, OnInit} from '@angular/core';
import {PriceTable} from '../../services/price-table/price-table';
import {PriceTableService} from '../../services/price-table/price-table.service';
import {AlertsService} from '../../services/alerts/alerts.service';

@Component({
    selector: 'app-price-table-admin',
    templateUrl: './price-table-admin.component.html',
    styleUrls: ['./price-table-admin.component.scss']
})
export class PriceTableAdminComponent implements OnInit {
    private priceTable: PriceTable = {
        taxPercent: null,
        pricePerKilometer: null
    };

    constructor(private priceTableService: PriceTableService, private alertsService: AlertsService) {
    }

    ngOnInit() {
        this.fetchPriceTable();
    }

    fetchPriceTable() {
        this.priceTableService.getPriceTable().subscribe((priceTable: PriceTable) => {
            this.priceTable = priceTable;
        });
    }

    updatePriceTable() {
        this.priceTableService.setPriceTable(this.priceTable).subscribe((priceTable: PriceTable) => {
            this.alertsService.addAlert({type: 'success', message: 'Price table changed successfully'});
            this.priceTable = priceTable;
        });
    }
}
