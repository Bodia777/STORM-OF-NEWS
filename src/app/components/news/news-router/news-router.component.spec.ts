import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsRouterComponent } from './news-router.component';

describe('NewsRouterComponent', () => {
  let component: NewsRouterComponent;
  let fixture: ComponentFixture<NewsRouterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsRouterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
