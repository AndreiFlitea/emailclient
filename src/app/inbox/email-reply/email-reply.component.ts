import { Component, Input, OnInit } from '@angular/core';
import { IndividualEmail } from '../email';
import { EmailServiceService } from '../email-service.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css'],
})
export class EmailReplyComponent {
  showModal = false;
  @Input() emailReply!: IndividualEmail; //we need the actual email that we want to reply to

  constructor(private emailService: EmailServiceService) {}

  ngOnChanges() {
    const text = this.emailReply.text.replace(/\n/gi, '\n> ');

    this.emailReply = {
      ...this.emailReply,
      from: this.emailReply.to,
      to: this.emailReply.from,
      subject: 'RE: ' + this.emailReply.subject,
      text: '\n\n\n----' + this.emailReply.from + ' wrote:\n> ' + text,
    };
  }

  onSubmit(email: IndividualEmail) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
