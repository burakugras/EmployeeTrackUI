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
  isManagerOrHRManager: boolean = false;

  constructor(private leaveRequestService: LeaveRequestService, private router: Router) {}

  ngOnInit(): void {
    this.checkUserRole(); // Kullanıcı rolünü kontrol et
    this.getLeaveRequests(); // İzin taleplerini getir
  }

  getLeaveRequests(): void {
    if (this.isManagerOrHRManager) {
      // Manager veya HRManager ise tüm izin taleplerini getir
      this.leaveRequestService.getAllRequests().subscribe({
        next: (data) => {
          console.log('Leave Requests (Manager/HRManager):', data);
          this.leaveRequests = data;
        },
        error: (err) => {
          console.error('Hata:', err);
        }
      });
    } else {
      // Diğer çalışanlar için kendi izin taleplerini getir
      const employeeId = this.getEmployeeIdFromToken();
      if (employeeId) {
        this.leaveRequestService.getEmployeeRequests(employeeId).subscribe({
          next: (data) => {
            console.log('Leave Requests (Employee):', data);
            this.leaveRequests = data;
          },
          error: (err) => {
            console.error('Hata:', err);
          }
        });
      }
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
        alert('İzin talebi onaylandı.');
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
        alert('İzin talebi reddedildi.');
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
