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
  userRemainingLeaves: number = 0;
  leaveRequests: any[] = [];
  isManagerOrHRManager: boolean = false;

  constructor(private leaveRequestService: LeaveRequestService, private router: Router) {}

  ngOnInit(): void {
    this.checkUserRole();
    this.getLeaveRequests();
    this.fetchRemainingLeaves();
  }

  getLeaveRequests(): void {
    if (this.isManagerOrHRManager) {
      this.leaveRequestService.getAllRequests().subscribe({
        next: (data) => {
          console.log('Leave Requests (Manager/HRManager):', data);
          this.leaveRequests = data.map((request: any) => ({
            id: request.id,
            startDate: request.startDate,
            endDate: request.endDate,
            status: request.status,
            employeeName: `${request.employee.firstName} ${request.employee.lastName}`,
            remainingLeaves: request.employee.remainingLeaves
          }));
        },
        error: (err) => {
          console.error('Hata:', err);
        }
      });
    } else {
      const employeeId = this.getEmployeeIdFromToken();
      if (employeeId) {
        this.leaveRequestService.getEmployeeRequests(employeeId).subscribe({
          next: (data) => {
            console.log('Leave Requests (Employee):', data);
            this.leaveRequests = data.map((request: any) => ({
              id: request.id,
              startDate: request.startDate,
              endDate: request.endDate,
              status: request.status,
              employeeName: this.userName,
              remainingLeaves: request.employee.remainingLeaves
            }));
          },
          error: (err) => {
            console.error('Hata:', err);
          }
        });
      }
    }
  }

  fetchRemainingLeaves(): void {
    const employeeId = this.getEmployeeIdFromToken();
    if (employeeId) {
      this.leaveRequestService.getEmployeeRequests(employeeId).subscribe({
        next: (data) => {
          if (data.length > 0) {
            this.userRemainingLeaves = data[0].employee.remainingLeaves;
          }
        },
        error: (err) => {
          console.error('Kalan izin günleri alınırken hata oluştu:', err);
        }
      });
    }
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

  checkUserRole(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Token Payload:', payload);

      this.userName = `${payload.FirstName} ${payload.LastName}`;

      const role = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      this.isManagerOrHRManager = role === 'Manager' || role === 'HRManager';
      console.log('isManagerOrHRManager:', this.isManagerOrHRManager);
    } catch (e) {
      console.error('Token çözümleme hatası:', e);
    }
  }

  approveRequest(requestId: string): void {
    this.leaveRequestService.approveLeaveRequest(requestId).subscribe({
      next: () => {
        this.getLeaveRequests();
      },
      error: (err) => {
        console.error('Onaylama hatası:', err);
      }
    });
  }

  rejectRequest(requestId: string): void {
    this.leaveRequestService.rejectLeaveRequest(requestId).subscribe({
      next: () => {
        this.getLeaveRequests();
      },
      error: (err) => {
        console.error('Reddetme hatası:', err);
      }
    });
  }

  createLeaveRequest(): void {
    this.router.navigate(['/leave-request-create']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
