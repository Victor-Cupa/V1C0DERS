import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProjectsModal } from './all-projects-modal';

describe('AllProjectsModal', () => {
  let component: AllProjectsModal;
  let fixture: ComponentFixture<AllProjectsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllProjectsModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProjectsModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
