import {Component, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {fadeStateTrigger} from '../shared/animations/fade.animation';

@Component({
  selector: 'hm-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
  animations: [fadeStateTrigger]
})

export class SystemComponent implements OnInit {
  @HostBinding('@fade') a = true;

  constructor(private authService: AuthService,
              private route: Router) {
  }


  ngOnInit() {
    if (!localStorage.getItem('user')) {
      this.route.navigate(['./login']);
    }
  }

}
