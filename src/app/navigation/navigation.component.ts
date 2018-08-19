import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angular-6-social-login';
import { MatSnackBar, MatBottomSheet } from '@angular/material';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { LoginDialogService } from '../login/login-dialog.service';
import { SettingComponent } from '../setting/setting.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  socialUser: User;
  role: string;

  constructor(private socialAuthService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private loginDialogServive: LoginDialogService,
    private router: Router,
    private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
  }

  adminSignIn() {
    this.loginDialogServive.login().subscribe((res: any) => {
      this.snackBar.open(res.message, 'Ok', {
        duration: 3000
      });
      if (res.message === 'Welcome') {
        this.socialUser = new User(0, 'Admin', 'admin@admin.com', null);
        sessionStorage.setItem('role', 'admin');
        this.role = sessionStorage.getItem('role');
        this.router.navigate(['admin']);
      }
    });
  }

  redirectToHomePage() {
    if (sessionStorage.getItem('role') === 'admin') {
      this.router.navigate(['admin']);
    } else if (sessionStorage.getItem('role') === 'customer') {
      this.router.navigate(['customer']);
    } else {
      this.snackBar.open('Unauthorized', 'Aww :(', {
        duration: 3000
      });
      this.logout();
    }
  }

  logout() {
    sessionStorage.clear();
    this.socialUser = null;
    this.router.navigate(['']);
  }

  public signIn() {
    this.socialAuthService.signIn('google').then(
      (userData) => {
        sessionStorage.setItem('role', 'customer');
        sessionStorage.setItem('userId', userData.id);
        this.role = sessionStorage.getItem('role');
        let users: User[];
        let flag = false;
        this.router.navigate(['customer']);
        this.userService.getUsers()
          .subscribe((result) => {
            users = result;

            users.forEach((user) => {
              if (user.id === userData.id) {
                flag = true;
                this.socialUser = user;
              }
            });

            if (!flag) {
              this.socialUser = new User(
                userData.id,
                userData.name,
                userData.email,
                userData.image
              );
              this.userService.addUser(
                new User(
                  userData.id,
                  userData.name,
                  userData.email,
                  userData.image
                )
              ).subscribe();
            }
          });
      }).catch(err => console.log('Custom' + err))
      .catch(err => console.log('Custom' + err));
  }

  openSettingsSheet() {
    this.bottomSheet.open(SettingComponent);
  }
}
