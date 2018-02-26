import { TestBed, inject } from '@angular/core/testing';

import { MyProjectService } from './my-project.service';

describe('MyProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyProjectService]
    });
  });

  it('should be created', inject([MyProjectService], (service: MyProjectService) => {
    expect(service).toBeTruthy();
  }));
});
