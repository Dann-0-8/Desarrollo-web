import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitTasksComponent } from './submit-tasks.component';

describe('SubmitTasksComponent', () => {
  let component: SubmitTasksComponent;
  let fixture: ComponentFixture<SubmitTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
