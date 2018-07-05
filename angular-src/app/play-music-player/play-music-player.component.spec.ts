import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayMusicPlayerComponent } from './play-music-player.component';

describe('PlayMusicPlayerComponent', () => {
  let component: PlayMusicPlayerComponent;
  let fixture: ComponentFixture<PlayMusicPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayMusicPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayMusicPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
