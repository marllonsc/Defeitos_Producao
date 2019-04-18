
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Defeito } from './../models/Defeito';
import { Injectable } from '@angular/core';
import { Texto } from 'app/models/Texto';


@Injectable()
export class RestDefectsService {

   // Define API
   apiURL = 'http://localhost:8080/ProducaoDefectsInfoAPI/rest';
   defeitos: Array<Defeito>;

   constructor(private http: HttpClient) { }

  getDefeitos() {
    return this.http.get<Defeito[]>(`/ProducaoDefectsInfoAPI/rest/RestServiceDesfeitos/defeitos`, this.httpOptions);
  }

  //LEMBRAR DE TENTAR RETORNAR ISSO EM FORMA DE JSON
  getTexto() {
    return this.http.get<Texto>(`/ProducaoDefectsInfoAPI/rest/RestServiceDesfeitos/getText`);
  }

  setTexto(body : String) {
    return this.http.post<Boolean>(`/ProducaoDefectsInfoAPI/rest/RestServiceDesfeitos/setText`, body);
  }

 
   /*========================================
     ...
   =========================================*/
 
   // Http Options
   httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Access-Control-Allow-Methods': 'GET, OPTIONS',
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Headers': 'session-variable'
     })
   }  


   // Http Options2
   httpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'session-variable'
    })
  }  
   

private handleError(error: Response) {
  console.error(error);
}

}
