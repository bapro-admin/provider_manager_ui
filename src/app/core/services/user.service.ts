import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

const API_PATH = environment.API_URL;
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private http: HttpClient) { }

    createUser(user: User){
        return this.http.post(`${API_PATH}/users`,  user , httpOptions);
    }

    listUsers(){
        return this.http.get<User[]>(`${API_PATH}/users`, httpOptions).pipe(
            map((response: any)=> {
                return response
            })
        );
    }

    findUser(id: any){
        return this.http.get(`${API_PATH}/users/${id}`, httpOptions).pipe(
            map((response: any)=> {
                return response
            })
        );
    }
    
    updateUser(id: any, user: any){
        return this.http.put(`${API_PATH}/users/${id}`, user, httpOptions);
    }

    deleteUser(id: any){
        return this.http.delete(`${API_PATH}/users/${id}`, httpOptions);
    }
}