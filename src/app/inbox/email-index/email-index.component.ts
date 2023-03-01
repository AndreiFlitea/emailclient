import { Component, OnInit } from '@angular/core';
import { EmailServiceService } from '../email-service.service';

@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.css'],
})
export class EmailIndexComponent implements OnInit {
  emailList: any;
  constructor(private emailService: EmailServiceService) {}

  ngOnInit() {
    this.emailService.getEmails().subscribe((emails) => {
      this.emailList = emails;
      console.log(this.emailList);
    });
  }
}
