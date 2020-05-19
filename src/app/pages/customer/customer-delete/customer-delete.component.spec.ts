import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomderDeleteComponent } from './customder-delete.component';

describe('CustomderDeleteComponent', () => {
  let component: CustomderDeleteComponent;
  let fixture: ComponentFixture<CustomderDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomderDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomderDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
