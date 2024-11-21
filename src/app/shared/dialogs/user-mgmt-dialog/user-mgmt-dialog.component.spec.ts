import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMgmtDialogComponent } from './user-mgmt-dialog.component';

describe('UserMgmtDialogComponent', () => {
  let component: UserMgmtDialogComponent;
  let fixture: ComponentFixture<UserMgmtDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMgmtDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMgmtDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
