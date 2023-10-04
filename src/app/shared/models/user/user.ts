import {Role} from "./role";
import {Area} from "../system/area";

export interface IUser {
    jwtToken: string;
    expires: number;
    id: number;
    roleId: number;
    role: Role;
    areaId: number;
    area: Area;
    imageUrl: string;
    iin: string;
    name: string;
    surname: string;
    patronymic: string;
    fullName: string;
    phone: string;
    email: string;
    password: string;
    verified: boolean;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

