package org.spring.busreservation.controllers;

import org.spring.busreservation.domain.Role;
import org.spring.busreservation.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RolesController {
    @Autowired
    private RoleService roleService;

    @RequestMapping(value = "/admin/roles", method = RequestMethod.GET)
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }

    @RequestMapping(value = "/admin/roles", method = RequestMethod.POST)
    public Role addRole(@RequestBody Role role) {
        return roleService.addRole(role);
    }

    @RequestMapping(value = "/admin/roles", method = RequestMethod.PUT)
    public Role updateRole(@RequestBody Role role) {
        return roleService.updateRole(role);
    }

    @RequestMapping(value = "/admin/roles/{id}", method = RequestMethod.DELETE)
    public void deleteRole(@PathVariable Long id) {
        roleService.deleteRole(id);
    }
}
