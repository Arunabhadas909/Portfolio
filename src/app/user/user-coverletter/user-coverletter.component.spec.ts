import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCoverletterComponent } from './user-coverletter.component';

describe('UserCoverletterComponent', () => {
  let component: UserCoverletterComponent;
  let fixture: ComponentFixture<UserCoverletterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCoverletterComponent]
    });
    fixture = TestBed.createComponent(UserCoverletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
