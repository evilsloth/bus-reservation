package org.spring.busreservation.controllers;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.spring.busreservation.domain.Ticket;
import org.spring.busreservation.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

@Controller
@RequestMapping("/api")
public class PdfController {
    @Autowired
    TicketService ticketService;

    @RequestMapping(value = "/ticket-pdf/{id}", method = RequestMethod.GET)
    public ResponseEntity<byte[]> getTicketPdf(@PathVariable Long id) {
        Ticket ticket = ticketService.getTicket(id);

        if (ticket == null) {
            throw new RuntimeException("Ticket not found!");
        }

        try {
            generatePdf(ticket);

            // retrieve contents of pdf file
            Path path = Paths.get("temp/output.pdf");
            byte[] contents = Files.readAllBytes(path);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("application/pdf"));
            String filename = "output.pdf";
            headers.setContentDispositionFormData(filename, filename);
            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
            ResponseEntity<byte[]> response = new ResponseEntity<byte[]>(contents, headers, HttpStatus.OK);
            return response;
        } catch (Exception e) {
            e.printStackTrace();
        }

        ResponseEntity<byte[]> response = new ResponseEntity<byte[]>(HttpStatus.BAD_REQUEST);
        return response;
    }


    private Document generatePdf(Ticket ticket) throws Exception {
        Document document = new Document();

        PdfWriter.getInstance(document, new FileOutputStream("/home/jarek/temp/output.pdf"));
        document.open();
        PdfPTable table = new PdfPTable(2);

        PdfPCell cell = new PdfPCell(new Paragraph("Ticket"));

        cell.setColspan(2);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setPadding(10.0f);
        cell.setBackgroundColor(new BaseColor(140, 221, 8));

        table.addCell(cell);
        ArrayList<String[]> row = new ArrayList<>();
        String[] data = new String[2];
        data[0] = "Ticket number:";
        data[1] = ticket.getTicketNumber();
        row.add(data);

        data = new String[2];
        data[0] = "Price:";
        data[1] = ticket.getPrice().toString() + " PLN";
        row.add(data);

        data = new String[2];
        data[0] = "From:";
        data[1] = ticket.getConnection().getStartPlace();
        row.add(data);

        data = new String[2];
        data[0] = "To:";
        data[1] = ticket.getConnection().getEndPlace();
        row.add(data);

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");

        data = new String[2];
        data[0] = "Departure date:";
        data[1] = formatter.format(ticket.getConnection().getDepartureDate());
        row.add(data);

        data = new String[2];
        data[0] = "Arrival date:";
        data[1] = formatter.format(ticket.getConnection().getArrivalDate());
        row.add(data);

        for (int i = 0; i < row.size(); i++) {
            String[] cols = row.get(i);
            for (int j = 0; j < cols.length; j++) {

                table.addCell(cols[j]);

            }

        }

        document.add(table);
        document.close();
        return document;
    }
}
