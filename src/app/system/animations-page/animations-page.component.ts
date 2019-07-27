import {Component, OnInit} from '@angular/core';
import {changeWidth, divTrigger} from '../../shared/animations/fade.animation';

@Component({
  selector: 'hm-animations-page',
  templateUrl: './animations-page.component.html',
  styleUrls: ['./animations-page.component.scss'],
  animations: [divTrigger, changeWidth]
})

export class AnimationsPageComponent implements OnInit {
  public isVisible = false;

  constructor() {
  }

  ngOnInit() {
  }

  onAnimationStart(e: AnimationEvent) {
    console.log(e);
  }

  onAnimationEnd(e: AnimationEvent) {
    console.log(e);
  }

  changeState() {
    // this.clickedDivState = 'clicked';
    // this.multiState = this.multiState === 'end' ? 'start' : 'end';
    // setTimeout(() => this.multiState = 'start', 800);
  }

}
