import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAddComponent } from './my-add.component';

describe('MyAddComponent', () => {
  let component: MyAddComponent;
  let fixture: ComponentFixture<MyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
