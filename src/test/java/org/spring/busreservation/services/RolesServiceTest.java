package org.spring.busreservation.services;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.spring.busreservation.domain.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class RolesServiceTest {
    @Autowired
    private RoleService roleService;

    @Test
    public void testGetAll() {
        List<Role> roles = roleService.getAllRoles();
        Assert.assertNotNull(roles);
        Assert.assertEquals(2, roles.size());
    }

    @Test
    public void testCreateOrGetUserRole() {
        Role role = roleService.createOrGetRoleUser();
        Assert.assertNotNull(role);

        roleService.deleteRole(role.getId());
        role = roleService.createOrGetRoleUser();
        Assert.assertNotNull(role);
    }
}
