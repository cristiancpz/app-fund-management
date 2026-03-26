import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStateService } from '../../../../shared/services/user-state.service';
import { formatMoney } from '../../../../shared/utils/format-money.utils';

@Component({
  selector: 'app-historical-page',
  imports: [CommonModule],
  templateUrl: './historical-page.html',
  styleUrl: './historical-page.scss',
})
export class HistoricalPage {
  private readonly userState = inject(UserStateService);

  readonly transactions = this.userState.transactions;

  formatAmount(amount: number): string {
    return formatMoney(amount);
  }
}
