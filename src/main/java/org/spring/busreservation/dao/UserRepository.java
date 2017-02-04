package org.spring.busreservation.dao;

import org.spring.busreservation.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findOneByEmail(String email);
    User findOneByActivationHash(String activationHash);
}
