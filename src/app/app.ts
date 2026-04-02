import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PdfViewerModule, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('pdf-test');

  constructor(private cdr: ChangeDetectorRef) {}

  pdfSrc: string | Uint8Array = './61.pdf';
  pdfVisible = true;

  currentPage = 1;
  pageSize = 2;

  get pagesToShow(): number[] {
    const size = Math.max(1, this.pageSize || 1);
    return Array.from({ length: size }, (_, i) => this.currentPage + i);
  }

  next() {
    this.currentPage += this.pageSize;
  }

  prev() {
    this.currentPage = Math.max(1, this.currentPage - this.pageSize);
  }

  onPageSizeChange(newSize: number) {
    if (newSize < 1 || !newSize) {
      this.pageSize = 1;
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    if (file.type !== 'application/pdf') {
      alert('Выберите PDF файл');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.pdfVisible = false;
      this.cdr.detectChanges();

      this.pdfSrc = new Uint8Array(reader.result as ArrayBuffer);

      this.currentPage = 1;
      this.pageSize = 1; // ✅ сброс на 1 страницу

      this.pdfVisible = true;
    };

    reader.readAsArrayBuffer(file);
  }
}
