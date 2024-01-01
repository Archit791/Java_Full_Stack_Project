import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:9092/user';

  getUserList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/allUsers`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

  postNewUser(formvalue: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, formvalue);
  }

  editOldUser(editedUserData: any, id: number) {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, editedUserData);
  }
}
