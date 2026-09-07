import { Directive, ElementRef, AfterViewInit, OnDestroy, Input } from '@angular/core';

/**
 * Ajoute la classe .in a l'element quand il entre dans le viewport,
 * ce qui declenche la transition CSS .reveal definie dans styles.css.
 * Usage : <div appReveal [revealDelay]="80">...</div>
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
  host: { class: 'reveal' },
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  @Input() revealDelay = 0;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              this.el.nativeElement.classList.add('in');
            }, this.revealDelay);
            this.observer?.unobserve(this.el.nativeElement);
          }
        });
      },
      { threshold: 0.15 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
