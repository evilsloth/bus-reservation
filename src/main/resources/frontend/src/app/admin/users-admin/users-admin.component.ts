import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {User} from '../../services/user/user';
import {AlertsService} from '../../services/alerts/alerts.service';
import {UserFull} from '../../services/user/user-full';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RolesAdminComponent} from '../roles-admin/roles-admin.component';

@Component({
    selector: 'app-users-admin',
    templateUrl: './users-admin.component.html',
    styleUrls: ['./users-admin.component.scss']
})
export class UsersAdminComponent implements OnInit {
    private users: UserFull[] = [];

    constructor(private userService: UserService, private alertsService: AlertsService,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.updateUserList();
    }

    updateUserList() {
        this.userService.getAllUsers().subscribe((users: UserFull[]) => {
            this.users = users;
            this.users.sort((elem1, elem2) => elem1.id - elem2.id);
        });
    }

    updateUser(user: UserFull) {
        this.userService.updateUser(user).subscribe(() => {
            this.alertsService.addAlert({type: 'success', message: 'Updated successfully'});
            this.updateUserList();
        });
    }

    deleteUser(id: number) {
        this.userService.deleteUser(id).subscribe(() => {
            this.alertsService.addAlert({type: 'success', message: 'Deleted successfully'});
            this.updateUserList();
        });
    }

    editRoles(user: UserFull) {
        let modalRef = this.modalService.open(RolesAdminComponent, {size: 'lg'});
        modalRef.componentInstance.userRoles = this.deepClone(user.roles).sort((r1, r2) => r1.id - r2.id);
        modalRef.result.then((roles) => {
            user.roles = roles;
        });
    }

    deepClone(oldArray: Object[]) {
        let newArray: any = [];
        oldArray.forEach((item) => {
            newArray.push(Object.assign({}, item));
        });
        return newArray;
    }
}
