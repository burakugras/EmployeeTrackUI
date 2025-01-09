import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './config';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getEmployeeRequests(employeeId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${this.baseUrl}/api/LeaveRequest/employee/${employeeId}`, { headers });
  }

  getAllRequests(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${this.baseUrl}/api/LeaveRequest`, { headers });
  }

  createLeaveRequest(request: { startDate: string; endDate: string }): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${this.baseUrl}/api/LeaveRequest`, request, { headers });
  }

  approveLeaveRequest(requestId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put(`${this.baseUrl}/api/LeaveRequest/${requestId}/approve`, null, { headers });
  }

  rejectLeaveRequest(requestId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put(`${this.baseUrl}/api/LeaveRequest/${requestId}/reject`, null, { headers });
  }
}
