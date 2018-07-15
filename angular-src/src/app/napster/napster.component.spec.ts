import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NapsterComponent } from './napster.component';

describe('NapsterComponent', () => {
  let component: NapsterComponent;
  let fixture: ComponentFixture<NapsterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NapsterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NapsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
