import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderMgmtDialogComponent } from './provider-mgmt-dialog.component';

describe('ProviderMgmtDialogComponent', () => {
  let component: ProviderMgmtDialogComponent;
  let fixture: ComponentFixture<ProviderMgmtDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderMgmtDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderMgmtDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
