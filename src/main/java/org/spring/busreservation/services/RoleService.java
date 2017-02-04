package org.spring.busreservation.services;

import org.spring.busreservation.domain.Role;

import java.util.List;

public interface RoleService {
    Role addRole(Role role);
    List<Role> getAllRoles();
    Role updateRole(Role role);
    void deleteRole(Long id);
    Role createOrGetRoleUser();
}
