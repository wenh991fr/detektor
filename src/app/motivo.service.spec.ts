import { TestBed, inject } from '@angular/core/testing';

import { MotivoService } from './motivo.service';

describe('MotivoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MotivoService]
    });
  });

  it('should be created', inject([MotivoService], (service: MotivoService) => {
    expect(service).toBeTruthy();
  }));
});
