import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PcStreamService {
  
  private mediaStream: MediaStream;
  private selectedDeviceId: string;
  private selectedFrameRate: number = 5;
  private baseUrl = environment.backend;
  constructor(private socket: Socket, private httpClient: HttpClient) { }

  getAvailableCameras(): Promise<MediaDeviceInfo[]> {
    return navigator.mediaDevices.enumerateDevices()
      .then(devices => devices.filter(device => device.kind === 'videoinput'));
  }

  startStreaming(videoElement: HTMLVideoElement): Observable<string> {
    this.socket.connect();
    const constraints: MediaStreamConstraints = {
      video: {
        deviceId: this.selectedDeviceId ? { exact: this.selectedDeviceId } : undefined,
        frameRate: { ideal: this.selectedFrameRate, max: this.selectedFrameRate}
      }
    };
    console.log(constraints)
    return new Observable<string>(observer => {
      navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
          this.mediaStream = stream;
          videoElement.srcObject = stream;

          const socket = this.socket;

          function captureFrame() {
            const canvas = document.createElement('canvas');
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            const ctx = canvas.getContext('2d');
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
      this.mediaStream
      // Clear the video element
      videoElement.srcObject = null;
    }
    // Disconnect from the socket
    this.socket.disconnect();
  }

  setSelectedCamera(deviceId: string) {
    this.selectedDeviceId = deviceId;
  }

  setFrameRate(selectedFrameRate: number) {
    this.selectedFrameRate = selectedFrameRate;
  }

  getFrameRate() {
    return this.selectedFrameRate;
  }

  setPcAnpr() {
    return this.httpClient.post(`${this.baseUrl}/initialize`, 'initialize' ,{ responseType: 'text' });
  } 
}
