import { Component } from '@angular/core';
import { CloudvisionService } from '../cloudvision.service';
import { ChatgptService } from '../chatgpt.service';

interface ChatIdeas {
  info: string[];
}

@Component({
  selector: 'app-image-chat',
  templateUrl: './image-chat.component.html',
  styleUrls: ['./image-chat.component.css']
})
export class ImageChatComponent {

  prompt: string = '';
  imageUrl: string ='';
  imageText: string='';

  chatideas: ChatIdeas = {
    info: [],
  };

  constructor(private chatgpt : ChatgptService, private vision : CloudvisionService) { }

  uploadImage(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.detectText(this.imageUrl);
      };
      reader.readAsDataURL(file);
    }
  }

  detectText(imageUrl: string) {
    this.vision.detectText(imageUrl).subscribe(result => {
      const textAnnotations = result.responses[0].textAnnotations;
      const text = textAnnotations.slice(1).map((a: { description: any; }) => a.description).join(' ');
      this.imageText = text;
      this.explainText(text);
    });
  }


  explainText(text:string) {
    
    const infoPrompt = text;
    this.chatgpt.generateChat(`${infoPrompt}`).subscribe((response: { choices: { message: { content: string; }; }[]; }) => {
      this.chatideas['info' as keyof ChatIdeas] =  [response.choices[0].message.content];
    });
  }
}
