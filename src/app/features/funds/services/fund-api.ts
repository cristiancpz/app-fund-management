import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFund } from '../interfaces/fund.interface';

@Injectable({
  providedIn: 'root',
})
export class FundApi {
  private readonly httpClient = inject(HttpClient);

  getProducts(): Observable<IFund[]> {
    return this.httpClient.get<IFund[]>('mock/founds-mock.json');
  }
}
