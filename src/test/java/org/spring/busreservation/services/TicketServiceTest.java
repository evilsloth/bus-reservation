package org.spring.busreservation.services;

import org.junit.Assert;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.spring.busreservation.domain.Connection;
import org.spring.busreservation.domain.Ticket;
import org.spring.busreservation.dto.ConnectionDto;
import org.spring.busreservation.exceptions.BookedTooLateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class TicketServiceTest {
    @Autowired
    TicketService ticketService;
    @Autowired
    ConnectionService connectionService;
    @Rule
    public ExpectedException thrown = ExpectedException.none();

    @Test
    public void testBooking() {
        Date now = new Date();
        final int minute = 1000 * 60;
        Date date60 = new Date(now.getTime() + (minute * 40));
        Date date70 = new Date(now.getTime() + (minute * 80));

        ConnectionDto connection = addConnection(date60, date70);
        Ticket ticket = ticketService.bookTicket(connection.getId(), "admin@admin.pl");
        Assert.assertNotNull(ticket);

        Date date25 = new Date(now.getTime() + (minute * 25));
        Date date80 = new Date(now.getTime() + (minute * 80));

        ConnectionDto connection2 = addConnection(date25, date80);
        thrown.expect(BookedTooLateException.class);
        ticketService.bookTicket(connection2.getId(), "admin@admin.pl");
    }

    private ConnectionDto addConnection(Date departureDate, Date arrivalDate) {
        ConnectionDto connection = new ConnectionDto();
        connection.setPlaces(2);
        connection.setStartPlace("FROM");
        connection.setEndPlace("TO");
        connection.setDistance(10);
        connection.setDepartureDate(departureDate);
        connection.setArrivalDate(arrivalDate);
        return connectionService.addConnection(connection);
    }
}
