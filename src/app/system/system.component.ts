import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'hm-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})

export class SystemComponent implements OnInit {

  constructor(private authService: AuthService,
              private route: Router) {
  }


  ngOnInit() {
    if (!localStorage.getItem('user')) {
      this.route.navigate(['./login']);
    }
  }

}
