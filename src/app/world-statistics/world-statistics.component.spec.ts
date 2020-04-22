import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldStatisticsComponent } from './world-statistics.component';

describe('WorldStatisticsComponent', () => {
  let component: WorldStatisticsComponent;
  let fixture: ComponentFixture<WorldStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
