import { TestBed } from '@angular/core/testing';

import { CloudvisionService } from './cloudvision.service';

describe('CloudvisionService', () => {
  let service: CloudvisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudvisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
