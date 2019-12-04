import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLoginCheckComponent } from './modal-login-check.component';

describe('ModalLoginCheckComponent', () => {
  let component: ModalLoginCheckComponent;
  let fixture: ComponentFixture<ModalLoginCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLoginCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLoginCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
