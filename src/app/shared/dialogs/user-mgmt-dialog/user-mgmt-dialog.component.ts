import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, 
        MatDialogContent, 
        MatDialogActions, 
        MatDialogClose, 
        MatDialogRef, 
        MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon'; 

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
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './user-mgmt-dialog.component.html',
  styleUrls: ['./user-mgmt-dialog.component.scss']
})
export class UserMgmtDialogComponent {
  readonly dialogRef = inject(MatDialogRef<UserMgmtDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA); // Aquí obtenemos los datos
  userForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]], 
      password: ['', Validators.required],
      role: [{ value: 'OPERATOR', disabled: true }]
    });
  }

  ngOnInit(): void {
    // Si los datos vienen del componente que abre el diálogo, hacer el patch
    if (this.data) {
      this.userForm.get('username')?.disable();
      this.userForm.patchValue({
        username: this.data.username,
        role: this.data.role
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveUserData(): void {
   /*  if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.getRawValue());
    } */
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    
    const formValue = this.userForm.getRawValue();
    
    // Si el usuario no ingresó una nueva contraseña, no la enviamos
    if (!formValue.password) {
      delete formValue.password;
    }
    
    this.dialogRef.close(formValue);
  }
}
