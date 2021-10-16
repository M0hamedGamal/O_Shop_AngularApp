import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) {
    // user$ is an Observable.
    auth.user$.subscribe((user) => {
      // If There's no user.
      if (!user) return;

      userService.saveUser(user); // Send a user data to saveUser method that can store a user into firebase database.

      let returnUrl = localStorage.getItem('returnUrl'); // Get uri that stored into Local Storage.

      // If There's no returnUrl.
      if (!returnUrl) return;

      localStorage.removeItem('returnUrl'); // remove this item from localStorage to avoid returning to home page after refresh the page.
      router.navigateByUrl(returnUrl); // Navigate to this uri.
    });
  }
}
