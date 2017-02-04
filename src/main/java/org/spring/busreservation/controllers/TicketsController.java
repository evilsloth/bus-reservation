package org.spring.busreservation.controllers;

import org.spring.busreservation.domain.Ticket;
import org.spring.busreservation.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TicketsController {
    @Autowired
    TicketService ticketService;

    @RequestMapping(value = "/tickets/book/{connectionId}", method = RequestMethod.POST)
    public Ticket bookTicket(@PathVariable Long connectionId) {
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ticketService.bookTicket(connectionId, user.getUsername());
    }

    @RequestMapping(value = "/tickets/{id}/cancel", method = RequestMethod.DELETE)
    public void cancelBookTicket(@PathVariable Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ticketService.cancelBookTicket(id, auth.getName());
    }

    @RequestMapping(value = "/tickets", method = RequestMethod.GET)
    public List<Ticket> getAllCurrentUserTickets() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return ticketService.getAllTicketsOfUser(auth.getName());
    }

    @RequestMapping(value = "/admin/tickets", method = RequestMethod.GET)
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @RequestMapping(value = "/admin/tickets/{id}", method = RequestMethod.DELETE)
    public void deleteTicket(@PathVariable Long id) {
        ticketService.deleteTicket(id);
    }
}
