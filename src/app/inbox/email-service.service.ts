import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IndividualEmail } from './email';

interface EmailList {
  id: string;
  subject: string;
  from: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailServiceService {
  rootUrl = 'https://api.angular-email.com';
  constructor(private http: HttpClient) {}

  getEmails() {
    return this.http.get<EmailList[]>(this.rootUrl + '/emails');
  }

  showEmailText(id: string) {
    return this.http.get<IndividualEmail>(this.rootUrl + `/emails/${id}`);
  }

  sendEmail(email: IndividualEmail) {
    return this.http.post(`${this.rootUrl}/emails`, email);
  }
}
