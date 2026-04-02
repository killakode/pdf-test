import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Не забудьте импортировать FormsModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PdfViewerModule, CommonModule, FormsModule], // <-- Добавлен FormsModule
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('pdf-test');

  pdfSrc = '/61.pdf';

  currentPage = 1;
  pageSize = 2; // Значение по умолчанию

  get pagesToShow(): number[] {
    // Гарантируем, что длина массива не будет отрицательной или нулевой
    const size = Math.max(1, this.pageSize || 1);
    return Array.from({ length: size }, (_, i) => this.currentPage + i);
  }

  next() {
    this.currentPage += this.pageSize;
  }

  prev() {
    this.currentPage = Math.max(1, this.currentPage - this.pageSize);
  }

  // Защита: если пользователь введет 0 или удалит значение, возвращаем минимум 1
  onPageSizeChange(newSize: number) {
    if (newSize < 1 || !newSize) {
      this.pageSize = 1;
    }
  }
}
