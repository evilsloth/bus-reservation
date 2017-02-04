package org.spring.busreservation.controllers;

import org.spring.busreservation.domain.PriceTable;
import org.spring.busreservation.services.PriceTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PriceTableController {
    @Autowired
    PriceTableService priceTableService;

    @RequestMapping(value = "/pricetable", method = RequestMethod.GET)
    public PriceTable getPriceTable() {
        return priceTableService.getPriceTable();
    }

    @RequestMapping(value = "/admin/pricetable", method = RequestMethod.POST)
    public PriceTable setPriceTable(@RequestBody PriceTable priceTable) {
        return priceTableService.updatePriceTable(priceTable);
    }
}
