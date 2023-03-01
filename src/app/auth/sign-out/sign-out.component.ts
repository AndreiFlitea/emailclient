import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

import { Router } from '@angular/router'; //used for working with app url

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css'],
})
export class SignOutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.authService.signOut().subscribe(() => {
      this.router.navigateByUrl(''); // NAVIGATE THE USER AFTER SING OUT TO ANOTHER PAGE
    });
  }
}
