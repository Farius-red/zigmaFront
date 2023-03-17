import { ComponentFixture, TestBed } from '@angular/core/testing';

import { addFormComponent } from './add.FormComponent';

describe('ThirdComponent', () => {
  let component: addFormComponent;
  let fixture: ComponentFixture<addFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ addFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(addFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
