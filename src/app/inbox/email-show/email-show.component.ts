import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { switchMap } from 'rxjs';

// import { EmailServiceService } from '../email-service.service';
// import { IndividualEmail } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css'],
})
export class EmailShowComponent {
  emailShow: any;

  constructor(
    private route: ActivatedRoute //here we have the informations from our resolver // private emailService: EmailServiceService
  ) {
    this.emailShow = route.snapshot.data['email']; //the snapshot loads first but it doesn`t change
    this.route.data.subscribe(({ email }) => {
      //we subscribe here( resolve method)
      this.emailShow = email;
    });
  }

  ngOnInit() {
    // this.route.params.subscribe(({ path }) => {
    //   this.emailService.showEmailText(path).subscribe((email) => {
    //     this.email = email;
    //   });
    // });
    // this.route.params
    //   .pipe(switchMap(({ path }) => this.emailService.showEmailText(path)))
    //   .subscribe((email) => {
    //     this.email = email;
    //   });
    // console.log(this.route.snapshot.params['path']);
  }
}
