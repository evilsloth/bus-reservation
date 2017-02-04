import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TicketsService} from '../services/tickets/tickets.service';
import {PriceTable} from '../services/price-table/price-table';
import {PriceTableService} from '../services/price-table/price-table.service';
import {Connection} from '../services/connections/connection';
import {Ticket} from '../services/tickets/ticket';

@Component({
    selector: 'app-ticket-confirmation',
    templateUrl: './ticket-confirmation.component.html',
    styleUrls: ['./ticket-confirmation.component.scss']
})
export class TicketConfirmationComponent implements OnInit {
    connection: Connection;
    ticket: Ticket;
    private pricePerKilometer = 0;

    constructor(private activeModal: NgbActiveModal, private ticketsService: TicketsService,
                private priceTableService: PriceTableService) {
    }

    ngOnInit() {
        this.fetchPriceTable();
    }

    fetchPriceTable() {
        this.priceTableService.getPriceTable().subscribe((priceTable: PriceTable) => {
            this.pricePerKilometer = priceTable.pricePerKilometer;
        });
    }

    bookTicket() {
        this.ticketsService.bookTicket(this.connection.id).subscribe((ticket: Ticket) => {
            this.ticket = ticket;
        });
    }
}
