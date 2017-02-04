import {Component, OnInit, OnChanges} from '@angular/core';
import {Connection} from '../services/connections/connection';
import {ConnectionsService} from '../services/connections/connections.service';
import * as moment from 'moment';
import {PriceTable} from '../services/price-table/price-table';
import {PriceTableService} from '../services/price-table/price-table.service';
import {UserService} from '../services/user/user.service';
import {TicketConfirmationComponent} from '../ticket-confirmation/ticket-confirmation.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
    private connections: Connection[];
    private filteredConnections: Connection[] = [];
    pricePerKilometer = 0;

    private filters = {
        dateMin: moment().hour(0).minute(0).format('YYYY-MM-DD HH:mm'),
        dateMax: null,
        from: '',
        to: ''
    };

    constructor(private connectionsService: ConnectionsService, private priceTableService: PriceTableService,
                public userService: UserService, private modalService: NgbModal) {
    }

    ngOnInit() {
        this.fetchConnections();
        this.fetchPriceTable();
    }

    fetchConnections() {
        this.connectionsService.getAllConnections().subscribe((connections: Connection[]) => {
            this.connections = connections;
            this.connections.sort((c1, c2) => c1.departureDate > c2.departureDate ? 1 : -1);
            this.filterConnections();
        });
    }

    fetchPriceTable() {
        this.priceTableService.getPriceTable().subscribe((priceTable: PriceTable) => {
            this.pricePerKilometer = priceTable.pricePerKilometer;
        });
    }

    filterConnections() {
        this.filteredConnections = this.connections.filter((connection: Connection) => {
            if (this.filters.dateMin && moment(connection.departureDate).isBefore(this.filters.dateMin)) {
                return false;
            }

            if (this.filters.dateMax && moment(connection.departureDate).isAfter(this.filters.dateMax)) {
                return false;
            }

            if (this.filters.from && connection.startPlace.toLowerCase().indexOf(this.filters.from.toLowerCase()) < 0) {
                return false;
            }

            if (this.filters.to && connection.startPlace.toLowerCase().indexOf(this.filters.to.toLowerCase()) < 0) {
                return false;
            }

            return true;
        });
    }

    clearFilter() {
        this.filters = {
            dateMin: null,
            dateMax: null,
            from: '',
            to: ''
        };
        this.filterConnections();
    }

    moreThan30MinutesToDeparture(connection: Connection): boolean {
        return moment(connection.departureDate).diff(moment(), 'minutes') > 30;
    }

    bookTicket(connection: Connection) {
        let modalRef = this.modalService.open(TicketConfirmationComponent, {size: 'lg'});
        modalRef.componentInstance.connection = connection;
        modalRef.result.then(() => {
            this.fetchConnections();
        }, () => {
            this.fetchConnections();
        });
    }
}
