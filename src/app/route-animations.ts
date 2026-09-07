import {
  trigger, transition, style, query, animate, group,
} from '@angular/animations';

// Anime l'entree de chaque page (fondu + leger deplacement vers le haut),
// declenchee a chaque changement de route.
export const routeFadeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(18px)' }),
    ], { optional: true }),
    query(':leave', [
      style({ position: 'absolute', width: '100%' }),
      animate('180ms ease', style({ opacity: 0 })),
    ], { optional: true }),
    group([
      query(':enter', [
        animate('450ms 80ms cubic-bezier(.22,.61,.36,1)', style({ opacity: 1, transform: 'translateY(0)' })),
      ], { optional: true }),
    ]),
  ]),
]);
