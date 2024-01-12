import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IpStreamService {
  private mediaStream: MediaStream;
  private selectedFrameRate: number = 5;
  private baseUrl = environment.backend;
  private workMode: String;

  constructor(private socket: Socket,private httpClient: HttpClient) { }

  startStreaming(): Observable<string> {
    this.socket.connect();
    return new Observable<string>(observer => {
      this.socket.emit('video_feed_ip', this.workMode);
      console.log(this.workMode);
      this.socket.on('video_feed_ip', (imageData: string) => {
        observer.next(imageData);
      });
    });
  }

  stopStreaming() {
    this.socket.disconnect();
    this.workMode = "0";
    console.log(this.workMode);
    return this.httpClient.get(`${this.baseUrl}/stopsource`, { responseType: 'text' });
  }

  setVideoSource(videoSource: string,fps: string) {
    const payLoad = {videoSource , fps};
    this.workMode = "1";
    return this.httpClient.post(`${this.baseUrl}/updatesource`,payLoad, { responseType: 'text' });
  }
}
