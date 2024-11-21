import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProviderService } from 'src/app/core/services/provider.service';

@Component({
  selector: 'app-provider-mgmt-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './provider-mgmt-dialog.component.html',
  styleUrls: ['./provider-mgmt-dialog.component.scss']
})
export class ProviderMgmtDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ProviderMgmtDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA); // Aquí obtenemos los datos
  providerForm: FormGroup;
  // Propiedades para almacenar si los campos ya existen
  commercialNameExists = false;
  businessNameExists = false;
  rfcExists = false;
  originalValues: { [key: string]: any } = {};


  constructor(private fb: FormBuilder, public providerServ: ProviderService) {
    this.providerForm = this.fb.group({
      id_provider: [null], // Este campo solo es útil para identificar al registro en edición
      commercialName: ['', Validators.required],
      businessName: ['', Validators.required],
      phone: ['', [Validators.pattern('^[0-9]*$')]],
      rfc: ['', [Validators.required, Validators.pattern('^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$')], { updateOn: 'blur' }],
      address: [''],
      sellerFullName: ['']
    });
  }

  ngOnInit(): void {
    // Si los datos vienen del componente que abre el diálogo, hacer el patch
    if (this.data) {
      this.providerForm.patchValue({
        id_provider: this.data.id_provider,
        commercialName: this.data.commercialName,
        businessName: this.data.businessName,
        phone: this.data.phone,
        rfc: this.data.rfc,
        address: this.data.address,
        sellerFullName: this.data.sellerFullName
      });

      this.originalValues = { ...this.data };

      // Si quieres verificar si los valores existen al abrir el diálogo
      /* this.checkIfFieldExists('commercialName', this.data.commercialName);
      this.checkIfFieldExists('businessName', this.data.businessName);
      this.checkIfFieldExists('rfc', this.data.rfc); */
    }
  }

  onFieldBlur(fieldName: string) {
    
    const currentValue = this.providerForm.get(fieldName)?.value?.trim();
    const originalValue = this.originalValues[fieldName]?.trim();
    // Si el valor no ha cambiado, no realizar la validación
    if (currentValue == originalValue) {
      return;
    }

    if (currentValue) {
      this.checkIfFieldExists(fieldName, currentValue);
    }
  }

  checkIfFieldExists(field: string, value: string) {
    const fixedValue = value.trim();
    const criteria: Record<string, any> = { field, value: fixedValue };
  
    // Si estamos editando, incluir el ID del proveedor
    if (this.providerForm.get('id')?.value) {
      criteria['excludeId'] = this.providerForm.get('id')?.value; // ID a excluir de la validación
    }
  
    this.providerServ.findProviderExistance(criteria).subscribe(
      data => {
        const providerExist = data.exists;
        this.setFieldExistenceError(field, providerExist);
      },
      error => {
        console.error('ERROR ON LIST PROVIDERS', error);
      }
    );
  }
  

  // Método para asignar el valor de existencia según el campo
  private setFieldExistenceError(field: string, exists: boolean) {
    const control = this.providerForm.get(field);
    if (control) {
      if (exists) {
        // Si el proveedor existe, establecemos un error personalizado
        control.setErrors({ exists: true });
      } else {
        // Si el proveedor no existe, eliminamos cualquier error de existencia
        control.setErrors(null);
      }
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  getInvalidControls() {
    return Object.keys(this.providerForm.controls).map(controlName => {
      const control = this.providerForm.get(controlName);
      return control && control.invalid
        ? { name: controlName, errors: control.errors }
        : null;
    }).filter(Boolean);
  }

  saveProviderData(): void {
    if (this.providerForm.invalid) {
      console.log('Hay errores en el formulario:');
      this.getInvalidControls().forEach(control => {
        console.log(`${control?.name}:`, control?.errors);
      });
      return; // Detener el guardado
    }
  
    this.dialogRef.close(this.providerForm.getRawValue());
  }
}
