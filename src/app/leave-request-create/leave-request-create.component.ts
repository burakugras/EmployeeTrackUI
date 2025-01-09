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
  errorMessage: string | null = null;

  constructor(private leaveRequestService: LeaveRequestService, private router: Router) {}

  onSubmit(): void {
    if (!this.startDate || !this.endDate) {
      this.errorMessage = 'İzin başlangıç veya bitiş alanları boş bırakılamaz.';
      return;
    }

    if (new Date(this.endDate) < new Date(this.startDate)) {
      this.errorMessage = 'Bitiş tarihi, başlangıç tarihinden önce olamaz.';
      return;
    }

    const leaveRequest = {
      startDate: this.startDate,
      endDate: this.endDate
    };

    this.leaveRequestService.createLeaveRequest(leaveRequest).subscribe({
      next: () => {
        this.successMessage = 'İzin talebi başarılı bir şekilde oluşturuldu.';
        this.errorMessage = null;
        setTimeout(() => this.router.navigate(['/leave-request']), 2000);
      },
      error: (err) => {
        this.successMessage = null;
        this.errorMessage = err.error?.message || 'İzin talebi oluşturulamadı. Lütfen tekrar deneyin.';
        console.error('Hata:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/leave-request']);
  }
}
