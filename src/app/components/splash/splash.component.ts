import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash',
  standalone: true,
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.css',
})
export class SplashComponent implements OnInit {
  @Output() finished = new EventEmitter<void>();

  ngOnInit(): void {
    // Duree totale de l'animation avant de reveler le site.
    setTimeout(() => this.finished.emit(), 2200);
  }
}
