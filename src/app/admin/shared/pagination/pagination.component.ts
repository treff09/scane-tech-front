import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() totalItems = 0;
  @Input() pageSize = 5;
  @Input() page = 1;
  @Input() afficherTout = false;

  @Output() pageChange = new EventEmitter<number>();
  @Output() afficherToutChange = new EventEmitter<boolean>();

  get nbPages(): number {
    return Math.max(1, Math.ceil(this.totalItems / this.pageSize));
  }

  get pages(): number[] {
    return Array.from({ length: this.nbPages }, (_, i) => i + 1);
  }

  get depasseLaLimite(): boolean {
    return this.totalItems > this.pageSize;
  }

  allerPage(p: number): void {
    if (p < 1 || p > this.nbPages) return;
    this.page = p;
    this.pageChange.emit(p);
  }

  toggleAfficherTout(): void {
    this.afficherTout = !this.afficherTout;
    if (this.afficherTout) { this.page = 1; }
    this.afficherToutChange.emit(this.afficherTout);
    this.pageChange.emit(this.page);
  }
}
