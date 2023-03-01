import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { IndividualEmail } from './email';
import { EmailServiceService } from './email-service.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailResolverService implements Resolve<IndividualEmail> {
  constructor(
    private emailService: EmailServiceService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { path } = route.params; //

    return this.emailService
      .showEmailText(path) //returns Observable and now we receive individual email
      .pipe(
        catchError(() => {
          this.router.navigateByUrl('/inbox/not-found'); // redirect to NotFoundComponent
          return EMPTY; // used to trick typescript
        })
      );
  }
}
// the purpose for this resolver is to avoid that error "property = undefined"
