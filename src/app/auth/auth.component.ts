import {Component, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {fadeStateTrigger} from '../shared/animations/fade.animation';

@Component({
  selector: 'hm-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [fadeStateTrigger]
})
export class AuthComponent implements OnInit {
  @HostBinding('@fade') a = true;

  constructor(private route: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.route.navigate(['./login']);
  }
}
