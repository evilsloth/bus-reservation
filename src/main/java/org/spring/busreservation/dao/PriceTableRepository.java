package org.spring.busreservation.dao;

import org.spring.busreservation.domain.PriceTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PriceTableRepository extends JpaRepository<PriceTable, Long> {

}
