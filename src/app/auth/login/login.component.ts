import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';

import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';


@Component({
  selector: 'hm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  message: Message;

  canLogIn: boolean;

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.canLogIn = false;
    this.message = new Message('error', '');

    this.form = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(4)])
      }
    );

    this.route.queryParamMap.subscribe(
      (params: ParamMap) => {
        if (params.has('canLogIn')) {
          const msg = new Message('success', 'Log in now!');
          this.showMessage(msg);
        } else if (params.has('accessDenied')) {
          const msg = new Message('warning', 'Access denied, log in!');
          this.showMessage(msg);
        }
      }
    );
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(
      () => {
        this.message.text = '';
      }, 3000);
  }


  postForm() {
    const formData = this.form.value;
    this.userService.getUserByEmail(formData.email).subscribe(
      (user: User) => {
        if (user) {
          if (user.password === formData.password) {
            this.message.text = '';
            const userObj = JSON.stringify(user);
            localStorage.setItem('user', userObj);
            this.authService.logIn();
            this.router.navigate(['/system', 'bill']);
          } else {
            const msg = new Message('error', 'Wrong pass!');
            this.showMessage(msg);
          }
        } else {
          const msg = new Message('error', 'No such user registered!');
          this.showMessage(msg);
        }
      }
    );
  }

}
