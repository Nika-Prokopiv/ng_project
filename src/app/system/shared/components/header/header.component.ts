import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'hm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public time: Date;
  public userName = '';

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.time = new Date();

    if (localStorage.getItem('user')) {
      const USER = JSON.parse(localStorage.getItem('user'));
      this.userName = USER.name;
    }
  }

  logOut() {
    this.router.navigate(['/login']);
    this.authService.logOut();
  }
}
