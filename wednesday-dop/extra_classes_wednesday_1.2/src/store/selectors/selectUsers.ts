import {UserType} from 'types';
import {RootStateOrAny, RootStoreType} from "../index";
import {Store} from "redux";


export const selectUsers = (state: RootStoreType): UserType[] => state.usersData.users;
