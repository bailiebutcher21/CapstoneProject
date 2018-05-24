import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesTabComponent } from './movies-tab.component';

describe('MoviesTabComponent', () => {
  let component: MoviesTabComponent;
  let fixture: ComponentFixture<MoviesTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
