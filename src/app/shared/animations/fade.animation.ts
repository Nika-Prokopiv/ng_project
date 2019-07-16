import {animate, group, keyframes, state, style, transition, trigger} from '@angular/animations';

export const fadeStateTrigger = trigger('fade', [
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate(500)
  ]),
  transition(':leave', animate(500, style({opacity: 0})))
]);

export const divTrigger = trigger('divTrigger', [
  transition(':enter', [
    style({
      width: '*',
      height: '*'
    }),
    group([
      animate('2s', style({
      width: '200px',
      height: '200px',
    })),
      animate('4s', keyframes([
        style({backgroundColor: 'lightsteelblue'}),
        style({backgroundColor: 'darkmagenta'}),
        style({backgroundColor: 'indigo'}),
        style({backgroundColor: 'steelblue'}),
        style({backgroundColor: 'pink'})
      ]))
    ]),
    animate('4s')
  ]),
  transition(':leave', animate('0.5s', style({opacity: 0})))
]);

export const changeWidth = trigger('changeWidth', [
  transition('* => *', [
    animate('1s', style({
      width: '520px'
    })),
    animate('1s', style({
      width: '*'
    }))
  ])
]);
// void => * = ':enter
// * => void = ':leave'
// initial size of element - *
