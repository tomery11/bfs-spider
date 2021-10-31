import { Component } from '@angular/core';
import {WebCrawlerService} from "./services/web-crawler.service";
import {isEmpty} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bfs-spider';
  public urlString:string = 'http://ynet.co.il'
  public maxDepth:number = 1
  public maxLinks:number = 5
  public errBlock: boolean = false;
  public loading: boolean = false;
  pages: Array<any> | undefined;
  public errorText: string = '';


  constructor(private _webCrawlerService: WebCrawlerService ) {

  }


  public getAllLinks(){
    this.pages = undefined
    this.errBlock = false
    this.loading = true
    this._webCrawlerService.getAllUrls(this.urlString,this.maxDepth.toString(),this.maxLinks.toString()).subscribe((data) => {
      this.pages = data
      this.loading = false
      console.log(JSON.stringify(data))
      if (JSON.stringify(this.pages) === '{}'){
        // console.log(this.errorText)
        this.errBlock = true;
        this.errorText = 'Your requested search was not found, you have a bad url';
      }
    }, error => {
      console.log('error')
      this.errBlock = true;
      this.errorText = 'Your requested search was not found, try something else';

    })



  }

}
