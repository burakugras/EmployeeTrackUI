import { Component, OnInit } from '@angular/core';
import { LeaveRequestService } from '../leave-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {
  userName: string = 'Kullanıcı Adı'; // Bu bilgi JWT Token'dan alınabilir.
  leaveRequests: any[] = [];

  constructor(private leaveRequestService: LeaveRequestService, private router: Router) {}

  ngOnInit(): void {
    this.getLeaveRequests();
  }

  getLeaveRequests(): void {
    this.leaveRequestService.getEmployeeRequests('current-user-id').subscribe({
      next: (data) => {
        this.leaveRequests = data;
      },
      error: (err) => {
        console.error('Hata:', err);
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
