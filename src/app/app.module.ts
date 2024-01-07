import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Socket, SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PcCameraStreamComponent } from './components/pc-camera-stream/pc-camera-stream.component';
import { IpCameraStreamComponent } from './components/ip-camera-stream/ip-camera-stream.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

const config: SocketIoConfig = { url: 'http://127.0.0.1:5000/', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    PcCameraStreamComponent,
    IpCameraStreamComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
