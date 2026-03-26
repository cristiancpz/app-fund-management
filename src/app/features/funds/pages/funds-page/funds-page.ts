import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FundUseCase } from '../../services/fund-use-case';
import { IFund } from '../../interfaces/fund.interface';
import { SubscriptionModal } from '../../components/subscription-modal/subscription-modal';

@Component({
  selector: 'app-funds-page',
  imports: [SubscriptionModal],
  templateUrl: './funds-page.html',
  styleUrl: './funds-page.scss',
})
export class FundsPage implements OnInit {
  private readonly fundUseCase = inject(FundUseCase);

  selectedFund = signal<IFund | null>(null);

  funds = computed(() => this.fundUseCase.fundList());

  ngOnInit(): void {
    this.fundUseCase.getFundList();
  }

  openModal(fund: IFund): void {
    this.selectedFund.set(fund);
  }

  closeModal(): void {
    this.selectedFund.set(null);
  }

  onConfirm(): void {
    this.selectedFund.set(null);
  }
}
