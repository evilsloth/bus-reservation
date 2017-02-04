import {Role} from '../role/role';

export interface UserFull {
    id: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    roles: Role[];
    activated: boolean;
    activationHash: string;
}
