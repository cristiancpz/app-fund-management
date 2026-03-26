import { IFund } from '../interfaces/fund.interface';
import { inject, Injectable, signal } from '@angular/core';
import { FundApi } from './fund-api';
import { map } from 'rxjs';
import { formatMoney } from '../../../shared/utils/format-money.utils';

@Injectable({
  providedIn: 'root',
})
export class FundUseCase {
  private readonly fundApi = inject(FundApi);

  fundList = signal<IFund[]>([]);


  getFundList(): void {
    this.fundApi.getProducts().pipe(
      map(result => result.map(item => ({
        ...item,
        mount_min: formatMoney(item.mount_min)
      })))
    ).subscribe({
      next: (founds) => {
        this.fundList.set(founds);
      }
    });
  }

}
