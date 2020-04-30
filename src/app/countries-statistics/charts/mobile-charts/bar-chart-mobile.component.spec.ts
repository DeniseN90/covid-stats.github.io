import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BarChartMobileComponent } from './bar-chart-mobile.component';

describe('BarChartMobileComponent', () => {
  let component: BarChartMobileComponent;
  let fixture: ComponentFixture<BarChartMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ BarChartMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
