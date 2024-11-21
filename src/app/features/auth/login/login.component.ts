import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { 
  ContainerComponent, 
  RowComponent, 
  ColComponent, 
  CardGroupComponent, 
  TextColorDirective, 
  CardComponent, 
  CardBodyComponent, 
  FormDirective, 
  InputGroupComponent, 
  InputGroupTextDirective, 
  FormControlDirective, 
  ButtonDirective } from '@coreui/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service'
import { User } from '../../../core/models/user.model';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [
      ContainerComponent, 
      RowComponent, 
      ColComponent, 
      CardGroupComponent, 
      TextColorDirective, 
      CardComponent, 
      CardBodyComponent, 
      FormDirective, 
      InputGroupComponent, 
      InputGroupTextDirective, 
      IconDirective, 
      FormControlDirective, 
      ButtonDirective, 
      NgStyle,
      ReactiveFormsModule,
      RouterModule ]
})
export class LoginComponent {
  loginForm: FormGroup;
  userdata = new User({})
  constructor( 
    private router: Router, 
    private fb: FormBuilder, 
    public authService: AuthService, 
    private snackBar: MatSnackBar,
    private sessionService : SessionStorageService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.username!, this.loginForm.value.password!).subscribe((data: { user: any; })=>{
        //TODO: eliminar que el servicio regrese el password aunque sea encriptado
        delete data.user.password;
        this.userdata = data.user;
        this.storeSession(data)
        if(this.userdata.role === 'ADMIN'){
          this.router.navigate(['/usuarios'])
        }else {
          this.router.navigate(['/proveedores'])
        }
      },(error: { error: { error: { message: any; }; }; })=>{
        console.log('ERROR ON LOGIN PROCESS', error)
        this.openSnackbar(`Ocurrio un error al iniciar sesion`, 'Ok')
      })
    }
  }

  openSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  storeSession(userData:any){
    this.sessionService.saveToken(userData.token)
    this.sessionService.saveUser(userData.user)
  }

}