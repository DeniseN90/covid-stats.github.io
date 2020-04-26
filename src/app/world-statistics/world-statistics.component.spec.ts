import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldStatisticsComponent } from './world-statistics.component';
import { HttpClientModule } from '@angular/common/http';

describe('WorldStatisticsComponent', () => {
  let component: WorldStatisticsComponent;
  let fixture: ComponentFixture<WorldStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
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
