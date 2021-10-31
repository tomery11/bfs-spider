import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WebCrawlerService {

  constructor(private _httpClient: HttpClient) { }

  public getAllUrls(urlString: string, maxDepth: string, maxLinks: string){
    let postUrl = "http://localhost:8080/crawl"
    const body = {
      url: urlString,
      maxDepth: maxDepth,
      maxLinks: maxLinks
    }
    console.log(JSON.stringify(body))
    return this._httpClient.post<any>(postUrl, body).pipe(catchError(this.handleError));
  }

  handleError(err: any){
    if (err instanceof HttpErrorResponse){

    }
    console.log(err)
    return throwError(err);
  }
}
