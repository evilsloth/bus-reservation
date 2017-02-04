package org.spring.busreservation.dao;

import org.spring.busreservation.domain.Captcha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaptchaRepository extends JpaRepository<Captcha, Long> {

}
