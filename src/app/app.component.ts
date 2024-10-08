import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild('video', { static: false }) video!: ElementRef<HTMLVideoElement>;
  urlImagem: string = '';

  capturarImagem() {
    const canvas = document.createElement('canvas');
    canvas.width = this.video.nativeElement.videoWidth;
    canvas.height = this.video.nativeElement.videoHeight;
    const context = canvas.getContext('2d');
    context?.drawImage(
      this.video.nativeElement,
      0,
      0,
      canvas.width,
      canvas.height
    );
    const imageUrl = canvas.toDataURL('image/png');

    this.urlImagem = imageUrl;
  }
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        this.urlVideo = imageUrl;
      };
      reader.readAsDataURL(file);
    }
  }
  urlVideo: string = '';

  title = 'capturar-imagem';
}
