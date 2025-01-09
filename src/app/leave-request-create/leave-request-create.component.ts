import { Component } from '@angular/core';
import { LeaveRequestService } from '../leave-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-request-create',
  templateUrl: './leave-request-create.component.html',
  styleUrls: ['./leave-request-create.component.css']
})
export class LeaveRequestCreateComponent {
  startDate: string = '';
  endDate: string = '';
  successMessage: string | null = null;

  constructor(private leaveRequestService: LeaveRequestService, private router: Router) {}

  onSubmit(): void {
    const leaveRequest = {
      startDate: new Date(this.startDate).toISOString(),
      endDate: new Date(this.endDate).toISOString()
    };
  
    this.leaveRequestService.createLeaveRequest(leaveRequest).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        setTimeout(() => this.router.navigate(['/leave-request']), 2000);
      },
      error: (err) => {
        alert(err.error?.message || 'İzin talebi oluşturulamadı. Lütfen tekrar deneyin.');
        console.error(err);
      }
    });
  }
  

  goBack(): void {
    this.router.navigate(['/leave-request']);
  }
}
