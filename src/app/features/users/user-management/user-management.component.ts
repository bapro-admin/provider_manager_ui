import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../core/services/user.service';
import { ConfirmDialogComponent } from '../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { UserMgmtDialogComponent } from '../../../shared/dialogs/user-mgmt-dialog/user-mgmt-dialog.component';
import { SessionStorageService } from '../../../core/services/session-storage.service';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent {
  displayedColumns: string[] = ['username', 'role', 'creationdate', 'actions'];
  dataSource: User[] = [];
  usersList: User[] = [];
  currentUser: string = '';
  registeredUsersCount = 0;
  maxUsers = 40; // Límite de usuarios

  constructor(
    public userServ: UserService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public sessionServ: SessionStorageService
  ) {}

  ngOnInit() {
    const sessionUser = this.sessionServ.getUser();
    this.currentUser = sessionUser.username;
    this.retrieveUsers();
  }

  ngOnDestroy(){
    //we close all dialog on destroy component to avoid navigation errors
    this.dialog.closeAll()
  }

  addUser() {
    if (this.registeredUsersCount >= this.maxUsers) {
      this.openSnackbar(
        `El número máximo de usuarios es ${this.maxUsers}. No puedes agregar más.`,
        'Ok'
      );
      return;
    }

    const dialogRef = this.dialog.open(UserMgmtDialogComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newUser = result as User;
        this.createUser(newUser);
      }
    });
  }

  editUser(user: User){
      const dialogRef = this.dialog.open(UserMgmtDialogComponent, {
        data: user
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          const updatedUser = result as User
          const passwordUpdate = { password : updatedUser.password }
          this.userServ.updateUser(user.id_user, passwordUpdate).subscribe(
            () => {
              this.openSnackbar(`Se actualizó el usuario correctamente`, 'Ok');
              this.retrieveUsers();
            },
            (error: { error: { error: { message: any } } }) => {
              console.log('ERROR ON UPDATE USER ', error);
              this.openSnackbar(`Ocurrió un error al actualizar el usuario`, 'Ok');
            } 
          )
        }
      });
    }

  deleteUserDialog(uid: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Usuario',
        message: '¿Seguro que quieres eliminar este usuario?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(uid);
      }
    });
  }

  createUser(user: User) {
    this.userServ.createUser(user).subscribe(
      () => {
        console.log('USUARIO CREADO CORRECTAMENTE');
        this.openSnackbar(`Se generó el usuario correctamente`, 'Ok');
        this.retrieveUsers();
      },
      (error: { error: { error: { message: any } } }) => {
        console.log('ERROR ON LIST USERS ', error);
        this.openSnackbar(`Ocurrió un error al obtener a los usuarios`, 'Ok');
      }
    );
  }

  deleteUser(userId: number) {
    this.userServ.deleteUser(userId).subscribe(
      () => {
        console.log('USUARIO BORRADO CORRECTAMENTE');
        this.openSnackbar(`Se eliminó el usuario correctamente`, 'Ok');
        this.retrieveUsers();
      },
      (error: { error: { error: { message: any } } }) => {
        console.log('ERROR ON DELETE USER ', error);
        this.openSnackbar(`Ocurrió un error al eliminar el usuario`, 'Ok');
      }
    );
  }

  retrieveUsers() {
    this.userServ.listUsers().subscribe(
      (data: { users: any }) => {
        this.usersList = data.users;
        // Eliminamos al usuario logeado para evitar que se liste a sí mismo
        this.usersList = this.usersList.filter(
          (user) => user.username !== this.currentUser
        );
        this.dataSource = this.usersList;
        this.registeredUsersCount = this.usersList.length;
      },
      (error: { error: { error: { message: any } } }) => {
        console.log('ERROR ON LIST USERS ', error);
        this.openSnackbar(`Ocurrió un error al obtener a los usuarios`, 'Ok');
      }
    );
  }

  openSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
