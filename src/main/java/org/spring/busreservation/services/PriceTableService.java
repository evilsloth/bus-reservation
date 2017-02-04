package org.spring.busreservation.services;

import org.spring.busreservation.domain.PriceTable;

public interface PriceTableService {
    PriceTable updatePriceTable(PriceTable priceTable);
    PriceTable getPriceTable();
}
