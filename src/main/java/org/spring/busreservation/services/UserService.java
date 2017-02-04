package org.spring.busreservation.services;

import org.spring.busreservation.domain.User;
import org.spring.busreservation.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    User addUser(UserDto userDto);
    User getUserById(Long id);
    User getUserByEmail(String email);
    List<User> getAllUsers();
    void updateUser(User user);
    void deleteUser(Long id);
    void activateEmail(String activationHash);
    void sendConfirmationEmailToUser(User user, String baseUrl);
}
