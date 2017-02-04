package org.spring.busreservation.services;

import org.spring.busreservation.domain.Captcha;
import org.spring.busreservation.dto.CaptchaDto;

public interface CaptchaService {
    CaptchaDto createCaptcha();
    boolean isCaptchaValid(Captcha captcha);
}
