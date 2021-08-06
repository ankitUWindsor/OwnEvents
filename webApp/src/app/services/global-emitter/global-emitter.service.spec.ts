import { TestBed } from '@angular/core/testing';

import { GlobalEmitterService } from './global-emitter.service';

describe('GlobalEmitterService', () => {
  let service: GlobalEmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalEmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
