import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';

@Component({
  selector: 'hm-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  emailExists: boolean;

  constructor(private userService: UsersService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], [this.checkEmail.bind(this)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'name': new FormControl(null, Validators.required),
      'agree': new FormControl(false, Validators.requiredTrue)
    });
  }

  checkEmail(control: FormControl): Promise<any> {
    return new Promise<any>(
      (resolve) => {
          this.userService.getUserByEmail(control.value).subscribe(
            (user: User) => {
              if (user) {
                resolve({forbiddenEmail: true});
              } else {
                resolve(null);
              }
            }
          );
      }
    );
    // this.userService.getUserByEmail(this.form.value['email']).subscribe(
    //   (res) => {
    //     his.emailExists = res !== undefined;
    //   }
    // );
  }

  postForm() {
    const user = new User(this.form.value['email'], this.form.value['password'], this.form.value['name']);
    this.userService.createNewUSer(user).subscribe(
      () => this.router.navigate(['/login'], {
        queryParams: {
          canLogIn: true
        }
      })
    );
  }

}
