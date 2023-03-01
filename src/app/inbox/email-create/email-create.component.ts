import { Component } from '@angular/core';
import { IndividualEmail } from '../email';
import { AuthService } from 'src/app/auth/auth.service';
import { EmailServiceService } from '../email-service.service';
@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css'],
})
export class EmailCreateComponent {
  showModal = false;
  emailCreate: IndividualEmail;
  username = this.authService.username + '@angular-email.com';

  constructor(
    private authService: AuthService,
    private emailService: EmailServiceService
  ) {
    this.emailCreate = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: this.username,
    };
  }

  onSubmit(email: IndividualEmail) {
    //send the email off via the email service
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
