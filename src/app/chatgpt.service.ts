import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {

  constructor(private http: HttpClient) { }

  generateChat(prompt: string) {
    const apiKey = environment.chatApiKey;
    const chatUrl = 'https://api.openai.com/v1/chat/completions';
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${apiKey}`);
    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": prompt}],
      temperature: 0.7,
    };
    return this.http.post<any>(chatUrl, requestBody, { headers });
  }
}
