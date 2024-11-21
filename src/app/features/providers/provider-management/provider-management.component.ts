import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { NgxDaterangepickerBootstrapDirective, NgxDaterangepickerBootstrapComponent } from "ngx-daterangepicker-bootstrap";
import dayjs from 'dayjs';
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Provider } from '../../../core/models/provider.model'
import { ProviderService} from '../../../core/services/provider.service'
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { ProviderMgmtDialogComponent } from '../../../shared/dialogs/provider-mgmt-dialog/provider-mgmt-dialog.component'
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { MatPaginatorIntlEs } from '../../../core/services/matPaginatorIntlEs.service'



@Component({
  selector: 'app-provider-management',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    CommonModule ,
    MatIconModule,
    MatButtonModule, 
    MatSelectModule,
    ReactiveFormsModule,
    NgxDaterangepickerBootstrapDirective,
    NgxDaterangepickerBootstrapComponent,
    MatCardModule,
    FormsModule,
    MatPaginatorModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlEs },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } }//for remove subscript for mat form field
  ],
  templateUrl: './provider-management.component.html',
  styleUrl: './provider-management.component.scss'
})
export class ProviderManagementComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns: string[] = [];
  //dataSource: Provider[] = []; 
  dataSource = new MatTableDataSource<Provider>();
  providersList: Provider[] = [];
  usersList: User[] = []
  operators = new FormControl<string[]>([]);
  operatorsList: any;
  currentUser: User | undefined;
  daterangepickerConfig = {
    locale: {
      format: 'DD/MM/YYYY', // Formato de las fechas
      separator: ' - ',
      applyLabel: 'Aplicar',
      cancelLabel: 'Cancelar',
      customRangeLabel: 'Personalizado',
      daysOfWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
      monthNames: [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ],
      firstDay: 1 // Inicio de la semana en lunes
    },
    alwaysShowCalendars: true, // Mostrar siempre los calendarios
  };
  selected: { startDate: dayjs.Dayjs; endDate: dayjs.Dayjs } = {
    startDate: dayjs(),
    endDate: dayjs().add(30, 'day'),
  };

  constructor(
    public providerServ: ProviderService,
    public usersServ: UserService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public sessionServ: SessionStorageService
  ){}


  ngOnInit(){
    this.currentUser = this.sessionServ.getUser();
    if(this.currentUser?.role === 'ADMIN'){
      this.displayedColumns = ['commertialName', 'bussinesName', 'phone', 'rfc', 'address', 'sellerName', 'operator', 'creationdate', 'actions'];
      this.retrieveUsersList()
    } else {
      this.displayedColumns =   ['commertialName', 'bussinesName', 'phone', 'rfc', 'address', 'sellerName', 'creationdate', 'actions'];
    }
    this.retrieveProvidersList()
    this.operators.valueChanges.subscribe((selectedOperators: string[] | null) => {
      this.filterProvidersByOperators(selectedOperators);
    });
  }

  ngOnDestroy(){
    //we close all dialog on destroy component to avoid navigation errors
    this.dialog.closeAll()
  }

  addProvider(){
    const dialogRef = this.dialog.open(ProviderMgmtDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const newProvider = result as Provider
        this.createProvider(newProvider)
      }
    });
  }

  editProvider(provider: Provider){
    const dialogRef = this.dialog.open(ProviderMgmtDialogComponent, {
      data: provider
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const updatedProvider = result as Provider
        this.updateProvider(provider.id_provider, updatedProvider)
      }
    });
  }

  deleteProviderDialog(uid: number){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Proveedor',
        message: '¿Seguro que quieres eliminar este proveedor?',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
       this.deleteProvider(uid)
      }
    });
  }

  exportProviders() {
    this.providerServ.exportProviders().subscribe(
        (response: Blob) => {
            // Crear la fecha en milisegundos
            const timestamp = new Date().getTime();

            // Crear el nombre del archivo dinámico
            const fileName = `proveedores_${timestamp}.xlsx`;

            // Crear un enlace para descargar el archivo
            const url = window.URL.createObjectURL(response);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;

            // Agregar el enlace al DOM y simular un clic
            document.body.appendChild(link);
            link.click();

            // Limpiar el enlace y liberar recursos
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            // Notificación de éxito
            this.openSnackbar(`Se exportaron correctamente los proveedores`, 'Ok');
        },
        (error: { error: any }) => {
            console.log('ERROR ON EXPORT PROVIDER LIST ', error);
            const msg = error.error?.msg || 'Ocurrió un error al exportar los proveedores';
            this.openSnackbar(msg, 'Ok');
        }
    );
  }


  filterProvidersByOperators(selectedOperators: string[] | null) {
    if (selectedOperators && selectedOperators.length > 0) {
      const filteredData = this.providersList.filter(provider =>
        selectedOperators.includes(provider.operatorUsername || '')
      );
      this.dataSource.data = filteredData;
    } else {
      this.dataSource.data = this.providersList;
    }
  }

  // Función para manejar el cambio de fecha
  onDateChange(event: any) {
    // Asignar las fechas seleccionadas a las variables
  const startDate = event?.startDate?.format('YYYY-MM-DD');  // Formato de fecha ISO
  const endDate = event?.endDate?.format('YYYY-MM-DD');  // Formato de fecha ISO
  
  // Llamar al servicio con las fechas seleccionadas
  this.retrieveProvidersList(startDate, endDate);
  }

  extractUniqueOperatorUsernames(providers: Provider[]) {
    const uniqueUsernames = [...new Set(providers.map(provider => provider.operatorUsername))];
    return uniqueUsernames;
  }

  createProvider(provider: Provider){
    this.providerServ.createProvider(provider).subscribe(()=>{
      console.log('PROVEEDOR CREADO CORRECTAMENTE')
      this.openSnackbar(`Se genero el proveedor correctamente`, 'Ok')
      this.retrieveProvidersList()
    },(error: { error: any })=>{
      console.log('ERROR ON CREATE PROVIDER ', error.error.msg)
      const msg = error.error.msg ? error.error.msg : 'Ocurrio un error al crear al proveedor'
      this.openSnackbar(msg, 'Ok')
    })
  }

  updateProvider(privider_id: number, provider: Provider){
    this.providerServ.updateProvider(privider_id, provider).subscribe(()=>{
      console.log('PROVEEDOR ACTUALIZADO CORRECTAMENTE')
      this.openSnackbar(`Se actualizo el proveedor correctamente`, 'Ok')
      this.retrieveProvidersList()
    },(error: { error: any })=>{
      console.log('ERROR ON LIST PROVIDERS ', error)
      const msg = error.error.msg ? error.error.msg : 'Ocurrio un error al actualizar al proveedor'
      this.openSnackbar(msg, 'Ok')
    })
  }

  deleteProvider(providerId: number){
    this.providerServ.deleteProvider(providerId).subscribe(()=>{
      console.log('PROVEEDOR BORRADO CORRECTAMENTE')
      this.openSnackbar(`Se elimino el proveedor correctamente`, 'Ok')
      this.retrieveProvidersList()
    },(error: { error: any })=>{
      console.log('ERROR ON DELETE PROVIDER ', error)
      const msg = error.error.msg ? error.error.msg : 'Ocurrio un error al eliminar al proveedor'
      this.openSnackbar(msg, 'Ok')
    })
  }

  retrieveProvidersList(startDate?: string, endDate?: string) {
    this.providerServ.listProviders(startDate, endDate).subscribe((data: { providerList: any; }) => {
      this.providersList = data.providerList.map((provider: Provider) => {
        const operator = this.usersList.find(user => user.id_user === provider.operatorId);
        return {
          ...provider,
          operatorUsername: operator ? operator.username : 'Desconocido',
        };
      });
  
      // Inicializamos el dataSource con los datos obtenidos
      this.dataSource.data = this.providersList;
  
      // Configuramos el paginador después de asignar los datos
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  retrieveUsersList(){
    this.usersServ.listUsers().subscribe((data: { users: any; })=>{
      this.usersList = data.users
    },(error: { error: { error: { message: any; }; }; })=>{
      console.log('ERROR ON LIST USERS ', error)
      this.openSnackbar(`Ocurrio un error al obtener a los usuarios`, 'Ok')
    })
  }

  openSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

}