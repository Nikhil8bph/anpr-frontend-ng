import { Socket } from 'ngx-socket-io';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PcStreamService } from 'src/app/service/pc-stream.service';

@Component({
  selector: 'app-pc-camera-stream',
  templateUrl: './pc-camera-stream.component.html',
  styleUrls: ['./pc-camera-stream.component.scss']
})
export class PcCameraStreamComponent implements OnInit {
  @ViewChild('videoElement') videoElement: ElementRef;
  videoStream: MediaStream;
  outputImageData: string;

  constructor(private videoStreamingService: PcStreamService) { }

  ngOnInit() {
    // Don't start video streaming automatically on component initialization
  }

  ngOnDestroy() {
    this.videoStreamingService.stopStreaming(this.videoElement.nativeElement);
  }

  startVideo() {
    this.videoStreamingService.startStreaming(this.videoElement.nativeElement)
      .subscribe(imageData => {
        this.outputImageData = imageData;
      });
  }

  stopVideo() {
    this.videoStreamingService.stopStreaming(this.videoElement.nativeElement);
    this.outputImageData = null; // Clear the output video when stopping
  }
}
