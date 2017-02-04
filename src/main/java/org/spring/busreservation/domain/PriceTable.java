package org.spring.busreservation.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Min;
import java.math.BigDecimal;

@Entity
public class PriceTable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Min(0)
    private BigDecimal pricePerKilometer;
    @Min(0)
    private BigDecimal taxPercent;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getPricePerKilometer() {
        return pricePerKilometer;
    }

    public void setPricePerKilometer(BigDecimal pricePerKilometer) {
        this.pricePerKilometer = pricePerKilometer;
    }

    public BigDecimal getTaxPercent() {
        return taxPercent;
    }

    public void setTaxPercent(BigDecimal taxPercent) {
        this.taxPercent = taxPercent;
    }
}
