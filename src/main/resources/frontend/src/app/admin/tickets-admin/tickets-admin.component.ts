import {Component, OnInit} from '@angular/core';
import {TicketsService} from '../../services/tickets/tickets.service';
import {AlertsService} from '../../services/alerts/alerts.service';
import {Ticket} from '../../services/tickets/ticket';

@Component({
    selector: 'app-tickets-admin',
    templateUrl: './tickets-admin.component.html',
    styleUrls: ['./tickets-admin.component.scss']
})
export class TicketsAdminComponent implements OnInit {
    private tickets: Ticket[] = [];

    constructor(private ticketsService: TicketsService, private alertsService: AlertsService) {
    }

    ngOnInit() {
        this.fetchTickets();
    }

    fetchTickets() {
        this.ticketsService.getAllTickets().subscribe((tickets: Ticket[]) => {
            this.tickets = tickets;
            this.tickets.sort((t1, t2) => t1.reservationDate > t2.reservationDate ? -1 : 1);
        });
    }

    deleteTicket(ticket: Ticket) {
        this.ticketsService.deleteTicket(ticket.id).subscribe(() => {
            this.alertsService.addAlert({type: 'success', message: 'Deleted successfully'});
            this.fetchTickets();
        });
    }
}
