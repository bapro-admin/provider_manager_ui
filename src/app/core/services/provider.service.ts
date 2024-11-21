import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Provider } from '../models/provider.model';

const API_PATH = environment.API_URL;
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
    providedIn: 'root'
})

export class ProviderService {
    constructor(private http: HttpClient) { }

    createProvider(provider: Provider){
        return this.http.post(`${API_PATH}/providers`,  provider , httpOptions);
    }

    listProviders(startDate?: string, endDate?: string){
        let params = new HttpParams();
    
        // Agregar startDate a los parámetros si está presente
        if (startDate) {
            params = params.set('startDate', startDate);
        }
    
        // Agregar endDate a los parámetros si está presente
        if (endDate) {
            params = params.set('endDate', endDate);
        }
    
        // Realizar la solicitud GET con los parámetros
        return this.http.get<Provider[]>(`${API_PATH}/providers`, { headers: httpOptions.headers, params })
            .pipe(
                map((response: any) => {
                    return response;
                })
            );
    }

    findProviderExistance(criteria: any){
        return this.http.post<any>(`${API_PATH}/providers/check-existence`,  criteria , httpOptions);
    }

    findProvider(id: any){
        return this.http.get(`${API_PATH}/providers/${id}`, httpOptions).pipe(
            map((response: any)=> {
                return response
            })
        );
    }
    
    updateProvider(id: any, provider: Provider){
        return this.http.put(`${API_PATH}/providers/${id}`, provider, httpOptions);
    }

    deleteProvider(id: any){
        return this.http.delete(`${API_PATH}/providers/${id}`, httpOptions);
    }

    exportProviders() {
        return this.http.post(`${API_PATH}/providers/export`, null, {
            responseType: 'blob', // Indica que la respuesta es un archivo binario
            headers: httpOptions.headers
        });
    }
}