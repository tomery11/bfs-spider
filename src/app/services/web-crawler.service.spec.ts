import { TestBed } from '@angular/core/testing';

import { WebCrawlerService } from './web-crawler.service';

describe('WebCrawlerService', () => {
  let service: WebCrawlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebCrawlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
