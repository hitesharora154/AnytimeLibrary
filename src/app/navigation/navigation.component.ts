import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angular5-social-login';
import { MatSnackBar } from '@angular/material';

import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  socialUser: User;

  constructor(private socialAuthService: AuthService, private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }


  public signIn() {
    this.socialAuthService.signIn('google').then(
      (userData) => {
        sessionStorage.setItem('role', 'customer');
        sessionStorage.setItem('userId', userData.id);
        let users: User[];
        let flag = false;
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
              ).subscribe(res => console.log(res));
            }
          });
      }).catch(err => console.log('Custom' + err))
      .catch(err => console.log('Custom' + err));
  }
}
