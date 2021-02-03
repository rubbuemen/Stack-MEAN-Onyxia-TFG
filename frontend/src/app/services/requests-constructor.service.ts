import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestsConstructorService {
  constructor(private httpClient: HttpClient) {}

  public request(
    method: string,
    uri: string,
    data: Object,
    headers: Object,
    modelClass?: any,
    auth: boolean = false
  ) {
    const httpMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    if (auth) {
      const jwtToken = localStorage.getItem('jwtToken');
      headers['Authorization'] = jwtToken;
    }
    try {
      if (!httpMethods.includes(method))
        throw new Error('El método HTTP indicado no es válido');
      let httpResponse: Observable<Object>;
      switch (method) {
        case 'GET':
          httpResponse = this.httpClient.get<typeof modelClass>(uri, headers);
          break;
        case 'POST':
          httpResponse = this.httpClient.post<typeof modelClass>(
            uri,
            data,
            headers
          );
          break;
        case 'PUT':
          httpResponse = this.httpClient.put<typeof modelClass>(
            uri,
            data,
            headers
          );
          break;
        case 'DELETE':
          httpResponse = this.httpClient.delete<typeof modelClass>(
            uri,
            headers
          );
          break;
      }
      return httpResponse;
    } catch (error) {
      throw error;
    }
  }
}
