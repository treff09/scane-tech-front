import { Directive, ElementRef, Input, AfterViewInit, OnDestroy } from '@angular/core';

/**
 * Anime un nombre de 0 jusqu'a sa valeur finale quand il entre dans le viewport.
 * Usage : <strong appCountUp [countTo]="2020">0</strong>
 * Pour un texte non-numerique (ex: "QHSE"), ne pas utiliser cette directive.
 */
@Directive({
  selector: '[appCountUp]',
  standalone: true,
})
export class CountUpDirective implements AfterViewInit, OnDestroy {
  @Input() countTo = 0;
  @Input() dureeMs = 1200;
  @Input() pad = 0; // ex: pad=2 -> "3" devient "03"

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.lancerAnimation();
            this.observer?.unobserve(this.el.nativeElement);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    );
    this.observer.observe(this.el.nativeElement);

    // Garde-fou : si l'element est deja visible au chargement (cas frequent
    // pour ces chiffres situes en haut de page), on lance sans attendre
    // un evenement de scroll qui pourrait ne jamais arriver.
    const rect = this.el.nativeElement.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      this.lancerAnimation();
      this.observer.unobserve(this.el.nativeElement);
    }
  }

  private lancerAnimation(): void {
    const debut = performance.now();
    const cible = this.countTo;

    const tick = (maintenant: number) => {
      const progression = Math.min((maintenant - debut) / this.dureeMs, 1);
      // Easing "ease-out" pour un effet plus naturel qu'une progression lineaire.
      const easedProgression = 1 - Math.pow(1 - progression, 3);
      const valeur = Math.round(easedProgression * cible);
      this.el.nativeElement.textContent = this.formatter(valeur);

      if (progression < 1) requestAnimationFrame(tick);
      else this.el.nativeElement.textContent = this.formatter(cible);
    };

    requestAnimationFrame(tick);
  }

  private formatter(valeur: number): string {
    return this.pad ? String(valeur).padStart(this.pad, '0') : String(valeur);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
