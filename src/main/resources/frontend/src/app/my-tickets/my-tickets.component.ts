import {Component, OnInit} from '@angular/core';
import {TicketsService} from '../services/tickets/tickets.service';
import {Ticket} from '../services/tickets/ticket';
import * as moment from 'moment';
import {Connection} from '../services/connections/connection';
import {AlertsService} from '../services/alerts/alerts.service';

@Component({
    selector: 'app-my-tickets',
    templateUrl: './my-tickets.component.html',
    styleUrls: ['./my-tickets.component.scss']
})
export class MyTicketsComponent implements OnInit {
    tickets: Ticket[] = [];

    constructor(private ticketsService: TicketsService, private alertsServie: AlertsService) {
    }

    ngOnInit() {
        this.fetchTickets();
    }

    fetchTickets() {
        this.ticketsService.getAllUserTickets().subscribe((tickets: Ticket[]) => {
            this.tickets = tickets;
            this.tickets.sort((t1, t2) => t1.reservationDate < t2.reservationDate ? 1 : -1);
        });
    }

    cancelReservation(ticket: Ticket) {
        this.ticketsService.cancelBookTicket(ticket.id).subscribe(() => {
            this.fetchTickets();
            this.alertsServie.addAlert({type: 'success', message: 'Reservation canceled succesfully!'});
        });
    }

    moreThan30MinutesToDeparture(connection: Connection): boolean {
        return moment(connection.departureDate).diff(moment(), 'minutes') > 30;
    }
}
