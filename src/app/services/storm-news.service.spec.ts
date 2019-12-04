import { TestBed } from '@angular/core/testing';

import { StormNewsService } from './storm-news.service';

describe('StormNewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StormNewsService = TestBed.get(StormNewsService);
    expect(service).toBeTruthy();
  });
});
