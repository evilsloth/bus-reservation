package org.spring.busreservation.services;

import org.spring.busreservation.dao.CaptchaRepository;
import org.spring.busreservation.domain.Captcha;
import org.spring.busreservation.dto.CaptchaDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import javax.transaction.Transactional;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.Date;

@Service
@Transactional
public class CaptchaServiceImpl implements CaptchaService {

    @Autowired
    CaptchaRepository captchaRepository;

    @Override
    public CaptchaDto createCaptcha() {
        String captchaText = getRandomText(6);
        byte[] captchaImageBytes = getCaptchaImageBytes(captchaText);

        Captcha captcha = new Captcha();
        captcha.setCaptcha(captchaText);
        captcha.setCreateDate(new Date());
        Captcha addedCaptcha = captchaRepository.save(captcha);

        CaptchaDto captchaDto = new CaptchaDto();
        captchaDto.setId(addedCaptcha.getId());
        captchaDto.setCaptchaImage(captchaImageBytes);
        return captchaDto;
    }

    @Override
    public boolean isCaptchaValid(Captcha captcha) {
        Captcha foundCaptcha = captchaRepository.findOne(captcha.getId());
        boolean captchaValid = foundCaptcha != null && foundCaptcha.getCaptcha().equals(captcha.getCaptcha());

        if (!captchaValid) {
            captchaRepository.delete(captcha.getId());
        }

        return captchaValid;
    }

    private String getRandomText(int captchaLength) {
        String saltChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuffer captchaStrBuffer = new StringBuffer();
        java.util.Random rnd = new java.util.Random();

        while (captchaStrBuffer.length() < captchaLength) {
            int index = (int) (rnd.nextFloat() * saltChars.length());
            captchaStrBuffer.append(saltChars.substring(index, index + 1));
        }

        return captchaStrBuffer.toString();
    }

    private byte[] getCaptchaImageBytes(String captcha) {
        byte[] imageBytes = null;

        try {
            int width = 100;
            int height = 40;

            Color bg = new Color(0, 255, 255);
            Color fg = new Color(0, 100, 0);

            Font font = new Font("Arial", Font.BOLD, 20);
            BufferedImage cpimg = new BufferedImage(width, height, BufferedImage.OPAQUE);
            Graphics g = cpimg.createGraphics();

            g.setFont(font);
            g.setColor(bg);
            g.fillRect(0, 0, width, height);
            g.setColor(fg);
            g.drawString(captcha, 10, 25);

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(cpimg, "png", baos);
            imageBytes = baos.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return imageBytes;
    }
}
