import { ModalAlertService } from './../../../../shared/services/modal-alert.service';
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStateService } from '../../../../shared/services/user-state.service';
import { MODAL_TYPE } from '../../../../shared/consts/modal.const';

@Component({
  selector: 'app-my-funds-page',
  imports: [CommonModule],
  templateUrl: './my-funds-page.html',
  styleUrl: './my-funds-page.scss',
})
export class MyFundsPage {
  private readonly userState = inject(UserStateService);
  private readonly modalAlertService = inject(ModalAlertService);

  readonly activeFunds = this.userState.activeFunds;
  readonly balanceFormatted = this.userState.balanceFormatted;

  confirmingId = signal<string | null>(null);

  requestCancel(subscriptionId: string): void {
    this.modalAlertService.show({
      title: 'Confirma la cancelación de la suscripción',
      description: 'Vas a cancelar la suscripción',
      type: MODAL_TYPE.CONFIRM,
      actionBtn: () => {
        this.confirmCancel(subscriptionId);
      }
    });
  }

  cancelConfirm(): void {
    this.confirmingId.set(null);
  }

  confirmCancel(subscriptionId: string): void {
    this.userState.remove(subscriptionId);
    this.confirmingId.set(null);
  }
}
