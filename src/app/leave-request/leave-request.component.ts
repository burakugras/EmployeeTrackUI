import { Component, OnInit } from '@angular/core';
import { LeaveRequestService } from '../leave-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {
  userName: string = '';
  leaveRequests: any[] = [];

  constructor(private leaveRequestService: LeaveRequestService, private router: Router) {}

  ngOnInit(): void {
    const employeeId = this.getEmployeeIdFromToken();
    if (employeeId) {
      this.getLeaveRequests(employeeId);
    } else {
      console.error('Token\'dan kullanıcı ID\'si alınamadı.');
    }
  }

  getLeaveRequests(employeeId: string): void {
    this.leaveRequestService.getEmployeeRequests(employeeId).subscribe({
      next: (data) => {
        this.leaveRequests = data;
      },
      error: (err) => {
        console.error('Hata:', err);
      }
    });
  }

  getEmployeeIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userName = `${payload.FirstName} ${payload.LastName}`;
      return payload.employeeId || null;
    } catch (e) {
      console.error('Token çözümleme hatası:', e);
      return null;
    }
  }

  createLeaveRequest(): void {
    this.router.navigate(['/leave-request-create']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
