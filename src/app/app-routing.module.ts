import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageChatComponent } from './image-chat/image-chat.component';


const routes: Routes = [
  { path: 'chatGPT', component:  ImageChatComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }