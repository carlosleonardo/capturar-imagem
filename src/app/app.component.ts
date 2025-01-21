import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  video = viewChild<ElementRef<HTMLVideoElement>>('video');
  urlImagem: string = '';

  capturarImagem() {
    const canvas = document.createElement('canvas');
    const videoElement = this.video();
    if (videoElement) {
      canvas.width = videoElement.nativeElement.videoWidth;
      canvas.height = videoElement.nativeElement.videoHeight;
      const context = canvas.getContext('2d');
      context?.drawImage(
        videoElement.nativeElement,
        0,
        0,
        canvas.width,
        canvas.height
      );
      const imageUrl = canvas.toDataURL('image/png');

      this.urlImagem = imageUrl;
    }
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
