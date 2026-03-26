import { Component, inject, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IFund } from '../../interfaces/fund.interface';
import { UserStateService } from '../../../../shared/services/user-state.service';
import { notificationsTypes, NOTIFICATONS_TYPES } from '../../const/subscription.const';

@Component({
  selector: 'app-subscription-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './subscription-modal.html',
  styleUrl: './subscription-modal.scss',
})
export class SubscriptionModal implements OnInit {
  private readonly userState = inject(UserStateService);

  fund = input.required<IFund>();
  closed = output<void>();
  confirmed = output<void>();

  readonly balance = this.userState.balance;
  readonly balanceFormatted = this.userState.balanceFormatted;

  readonly amountControl = new FormControl(0, {
    nonNullable: true,
    validators: [Validators.required]
  });

  NOTIFICATONS_TYPES = NOTIFICATONS_TYPES;

  notificationMethod: notificationsTypes = NOTIFICATONS_TYPES.EMAIL;
  insufficientBalance = false;

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.amountControl.valueChanges.subscribe({
      next: (value) => this.onAmountChange(value)
    });

    const raw = String(this.fund().mount_min).replace(/\D/g, '');
    const amount = raw ? Number(raw) : 0;

    this.amountControl.addValidators(Validators.min(amount));
    this.amountControl.updateValueAndValidity();
    this.amountControl.setValue(amount);
  }

  confirm(): void {
    if (this.amountControl.invalid) {
      this.amountControl.markAllAsTouched();
      return;
    }

    const controlValue = this.amountControl.value;

    if (controlValue > this.balance()) {
      this.insufficientBalance = true;
      return;
    }
    this.userState.add(this.fund(), controlValue, this.notificationMethod);
    this.confirmed.emit();
    this.close();
  }

  close(): void {
    this.closed.emit();
  }

  onAmountChange(balance: number): void {
    if (this.insufficientBalance) {
      this.insufficientBalance = balance > this.balance();
    }
  }
}
