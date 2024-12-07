import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasckComponent } from './tasck.component';

describe('TasckComponent', () => {
  let component: TasckComponent;
  let fixture: ComponentFixture<TasckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
