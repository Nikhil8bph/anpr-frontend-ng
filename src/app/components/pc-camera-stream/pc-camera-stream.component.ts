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
  @ViewChild('frameRateSelect') frameRateSelect: ElementRef;
  outputImageData: string;
  availableCameras: MediaDeviceInfo[] = [];
  selectedCameraId: string = '';

  constructor(private videoStreamingService: PcStreamService) { }

  ngOnInit() {
    // Don't start video streaming automatically on component initialization
    this.videoStreamingService.getAvailableCameras().then(devices => {
      this.availableCameras = devices;
      if (devices.length > 0) {
        this.selectedCameraId = devices[0].deviceId; // Select the first camera by default
      }
    });
  }

  ngOnDestroy() {
    this.videoStreamingService.stopStreaming(this.videoElement.nativeElement);
  }

  startVideo() {
    this.videoStreamingService.setSelectedCamera(this.selectedCameraId);
    console.log(this.selectedCameraId)
    this.videoStreamingService.startStreaming(this.videoElement.nativeElement)
      .subscribe(imageData => {
        this.outputImageData = imageData;
      });
  }

  stopVideo() {
    this.videoStreamingService.stopStreaming(this.videoElement.nativeElement);
    this.outputImageData = null; // Clear the output video when stopping
  }

  updateFrameRate() {
    this.videoStreamingService.setFrameRate(parseInt(this.frameRateSelect.nativeElement.value, 10));
    console.log(`Selected Frame Rate: ${this.videoStreamingService.getFrameRate()} FPS`);
    // You can perform additional actions based on the selected frame rate if needed
  }
}
