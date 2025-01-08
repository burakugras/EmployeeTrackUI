import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        // JWT Token'ı Local Storage'da saklama
        localStorage.setItem('token', response.token);
        // Kullanıcıyı Leave Request sayfasına yönlendirme
        this.router.navigate(['/leave-request']);
      },
      error: (err) => {
        alert('Login failed. Please check your credentials.');
      }
    });
  }
}
