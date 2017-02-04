package org.spring.busreservation.controllers;

import org.spring.busreservation.domain.User;
import org.spring.busreservation.dto.UserDto;
import org.spring.busreservation.exceptions.InvalidCaptchaException;
import org.spring.busreservation.services.CaptchaService;
import org.spring.busreservation.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UsersController {
    @Autowired
    private UserService userService;

    @Autowired
    private CaptchaService captchaService;

    @RequestMapping(value = "/users/register", method = RequestMethod.POST)
    public void register(@Valid @RequestBody UserDto userDto, HttpServletRequest request) {
        if (!captchaService.isCaptchaValid(userDto.getCaptcha())) {
            throw new InvalidCaptchaException();
        }

        User user = userService.addUser(userDto);

        String baseUrl = request.getRequestURL().toString().replace(request.getRequestURI(), request.getContextPath());
        userService.sendConfirmationEmailToUser(user, baseUrl);
    }

    @RequestMapping(value = "/users/confirm", method = RequestMethod.GET)
    public void confirmEmail(@RequestParam("h") String activationHash) {
        userService.activateEmail(activationHash);
    }

    @RequestMapping(value = "/admin/users", method = RequestMethod.GET)
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @RequestMapping(value = "/admin/users", method = RequestMethod.PUT)
    public void updateUser(@RequestBody User user) {
        userService.updateUser(user);
    }

    @RequestMapping(value = "/admin/users/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
