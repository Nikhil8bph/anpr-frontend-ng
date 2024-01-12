import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IpStreamService } from 'src/app/service/ip-stream.service';

@Component({
  selector: 'app-ip-camera-stream',
  templateUrl: './ip-camera-stream.component.html',
  styleUrls: ['./ip-camera-stream.component.scss']
})
export class IpCameraStreamComponent implements OnInit {
  @ViewChild('videoElement') videoElement: ElementRef;
  outputImageData: string;
  videoSource: string;
  frameRateSelect: string;

  constructor(private videoStreamingService: IpStreamService, private http: HttpClient) { }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.videoStreamingService.stopStreaming();
  }

  startVideo() {
    this.videoStreamingService.setVideoSource(this.videoSource,this.frameRateSelect).subscribe(data =>{
      console.log(data);
    });
    this.videoStreamingService.startStreaming()
      .subscribe(imageData => {
        this.outputImageData = imageData;
      });
  }

  stopVideo() {
    this.videoStreamingService.stopStreaming();
    this.outputImageData = null; // Clear the output video when stopping
  }

}
