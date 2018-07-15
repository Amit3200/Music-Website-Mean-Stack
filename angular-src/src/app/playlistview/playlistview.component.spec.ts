import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistviewComponent } from './playlistview.component';

describe('PlaylistviewComponent', () => {
  let component: PlaylistviewComponent;
  let fixture: ComponentFixture<PlaylistviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
