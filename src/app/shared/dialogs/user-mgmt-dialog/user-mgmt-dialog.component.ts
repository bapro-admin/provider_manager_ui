import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, 
        MatDialogContent, 
        MatDialogActions, 
        MatDialogClose, 
        MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-user-mgmt-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule
  ],
  templateUrl: './user-mgmt-dialog.component.html',
  styleUrls: ['./user-mgmt-dialog.component.scss']
})
export class UserMgmtDialogComponent {
  readonly dialogRef = inject(MatDialogRef<UserMgmtDialogComponent>);
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]], 
      password: ['', Validators.required],
      role: [{ value: 'OPERATOR', disabled: true }]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveUserData(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.getRawValue());
    }
  }
}
