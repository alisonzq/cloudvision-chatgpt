import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudvisionService {

  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiKey = environment.visionApiKey; 
    this.apiUrl = 'https://vision.googleapis.com/v1/images:annotate';
  }

  detectText(imageUrl: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const request = {
      requests: [
        {
          image: {
            source: {
              imageUri: imageUrl
            }
          },
          features: [
            {
              type: 'TEXT_DETECTION'
            }
          ]
        }
      ]
    };

    return this.http.post(this.apiUrl, request, { headers });
  }


}
