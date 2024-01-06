import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PcCameraStreamComponent } from './components/pc-camera-stream/pc-camera-stream.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'pccamerastream', component:PcCameraStreamComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
