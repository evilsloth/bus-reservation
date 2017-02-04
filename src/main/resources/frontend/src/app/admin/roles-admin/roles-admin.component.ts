import {Component, OnInit} from '@angular/core';
import {Role} from '../../services/role/role';
import {RoleService} from '../../services/role/role.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-roles-admin',
    templateUrl: './roles-admin.component.html',
    styleUrls: ['./roles-admin.component.scss']
})
export class RolesAdminComponent implements OnInit {
    userRoles: Role[] = [];
    roles: Role[] = [];
    rolesFromService: Role[] = [];
    roleToAdd: Role = {
        name: ''
    };

    constructor(private activeModal: NgbActiveModal, private roleService: RoleService) {
    }

    ngOnInit() {
        this.updateRoleList();
    }

    updateRoleList() {
        this.roleService.getAllRoles().subscribe((roles: Role[]) => {
            this.roles = roles;
            this.roles.sort((role1, role2) => role1.id - role2.id);
            this.rolesFromService = this.deepClone(this.roles);
            this.syncUserRoles();
        });
    }

    deepClone(oldArray: Object[]) {
        let newArray: any = [];
        oldArray.forEach((item) => {
            newArray.push(Object.assign({}, item));
        });
        return newArray;
    }

    addRole(role: Role) {
        this.roleService.addRole(role).subscribe(() => {
            this.updateRoleList();
            this.roleToAdd.name = '';
        });
    }

    updateRole(role: Role) {
        this.roleService.updateRole(role).subscribe(() => {
            this.updateRoleList();
        });
    }

    deleteRole(id: number) {
        this.roleService.deleteRole(id).subscribe(() => {
            this.updateRoleList();
        });
    }

    acceptChanges() {
        this.activeModal.close(this.userRoles);
    }

    removeUserRole(role: Role) {
        this.userRoles.splice(this.userRoles.indexOf(role), 1);
    }

    isRoleAdded(role: Role) {
        return this.userRoles.findIndex((r) => r.id === role.id) >= 0;
    }

    addUserRole(role: Role) {
        this.userRoles.push(role);
        this.syncUserRoles();
    }

    syncUserRoles() {
        let newUserRoles = [];

        for (let i = this.userRoles.length - 1; i >= 0; i--) {
            let foundById = this.rolesFromService.find((role) => role.id === this.userRoles[i].id);

            if (foundById) {
                newUserRoles.push(foundById);
            }
        }

        newUserRoles.sort((r1, r2) => r1.id - r2.id);
        this.userRoles = newUserRoles;
    }
}
