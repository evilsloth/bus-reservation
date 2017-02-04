import {Connection} from '../connections/connection';

export interface Ticket {
    id?: number;
    connection: Connection;
    price: number;
    reservationDate: string;
    ticketNumber: string;
}
