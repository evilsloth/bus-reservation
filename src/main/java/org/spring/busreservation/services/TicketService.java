package org.spring.busreservation.services;

import org.spring.busreservation.domain.Ticket;

import java.util.List;

public interface TicketService {
    Ticket bookTicket(Long connectionId, String username);
    void cancelBookTicket(Long ticketId, String username);
    List<Ticket> getAllTicketsOfUser(String username);
    void deleteTicket(Long id);
    List<Ticket> getAllTickets();
    Ticket getTicket(Long id);
}
