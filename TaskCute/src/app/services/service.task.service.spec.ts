import { TestBed } from '@angular/core/testing';

import { ServiceTaskService } from './service.task.service';

describe('ServiceTaskService', () => {
  let service: ServiceTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
