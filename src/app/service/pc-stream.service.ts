import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class PcStreamService {
  private mediaStream: MediaStream;
  constructor(private socket: Socket) { }

  startStreaming(videoElement: HTMLVideoElement): Observable<string> {
    this.socket.connect();
    return new Observable<string>(observer => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoElement.srcObject = stream;

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const socket = this.socket;

          function captureFrame() {
            ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL('image/jpeg', 0.5);
            socket.emit('video_feed', imageData);
          }

          setInterval(captureFrame, 100);

          this.socket.on('video_feed', (imageData: string) => {
            observer.next(imageData);
          });
        })
        .catch(error => {
          console.error('Error accessing camera:', error);
          observer.error(error);
        });
    }).pipe(
      catchError(err => {
        console.error('Error in video streaming:', err);
        return EMPTY;
      })
    );
  }

  stopStreaming(videoElement: HTMLVideoElement) {
    // Stop the media stream
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
    }

    // Clear the video element
    videoElement.srcObject = null;

    // Disconnect from the socket
    this.socket.disconnect();
  }
}
