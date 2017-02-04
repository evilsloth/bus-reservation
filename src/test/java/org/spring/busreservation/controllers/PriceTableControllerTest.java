package org.spring.busreservation.controllers;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.spring.busreservation.domain.PriceTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.math.BigDecimal;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class PriceTableControllerTest {
    @Autowired
    private PriceTableController priceTableController;

    @Test
    public void testGetPriceTable() {
        PriceTable priceTable = priceTableController.getPriceTable();
        Assert.assertNotNull(priceTable);
        Assert.assertEquals(0, priceTable.getPricePerKilometer().compareTo(new BigDecimal(0.50)));
    }

    @Test
    public void updatePriceTable() {
        PriceTable initialPriceTable = priceTableController.getPriceTable();
        Assert.assertNotNull(initialPriceTable);
        PriceTable priceTable = new PriceTable();
        priceTable.setPricePerKilometer(new BigDecimal(1));
        priceTable.setTaxPercent(new BigDecimal(22));
        priceTableController.setPriceTable(priceTable);
        PriceTable newPriceTable = priceTableController.getPriceTable();
        Assert.assertNotNull(newPriceTable);
        Assert.assertNotEquals(0, initialPriceTable.getPricePerKilometer().compareTo(newPriceTable.getPricePerKilometer()));

    }
}
