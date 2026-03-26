import { Injectable, signal, computed } from '@angular/core';
import { formatMoney } from '../utils/format-money.utils';
import { IFund } from '../../features/funds/interfaces/fund.interface';
import { STORAGE_KEYS } from '../consts/storage-keys.const';
import { INITIAL_BALANCE } from '../consts/balance.const';
import { IActiveFund, ITransaction } from '../interfaces/funds-state.interface';
import { transactionType, TYPE_TRANSACTION } from '../consts/state.const';
import { notificationsTypes } from '../../features/funds/const/subscription.const';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private readonly _balance = signal<number>(this.loadBalance());
  private readonly _activeFunds = signal<IActiveFund[]>(this.loadActiveFunds());
  private readonly _transactions = signal<ITransaction[]>(this.loadTransactions());

  readonly balance = this._balance.asReadonly();
  readonly balanceFormatted = computed(() => formatMoney(this._balance()));
  readonly activeFunds = this._activeFunds.asReadonly();
  readonly activeFundsCount = computed(() => this._activeFunds().length);
  readonly transactions = this._transactions.asReadonly();

  add(fund: IFund, amount: number, notification: notificationsTypes): void {

    const now = this.currentDate();
    const entry: IActiveFund = {
      id: `${fund.id}-${Date.now()}`,
      fund,
      amount: amount,
      notification,
      dateAt: now,
    };

    this._balance.update(current => current - amount);
    this._activeFunds.update(current => [...current, entry]);

    this.addTransaction(
      TYPE_TRANSACTION.SUBSCRIPTION,
      fund.name,
      amount,
      notification,
      now
    );

    this.saveBalance();
    this.saveActiveFunds();
  }

  remove(subscriptionId: string): void {
    const entry = this._activeFunds().find(f => f.id === subscriptionId);
    if (!entry) return;

    this._balance.update(current => current + entry.amount);
    this._activeFunds.update(current => current.filter(f => f.id !== subscriptionId));
    this.addTransaction(
      TYPE_TRANSACTION.CANCELATION,
      entry.fund.name,
      entry.amount,
      entry.notification,
      this.currentDate()
    );

    this.saveBalance();
    this.saveActiveFunds();
  }

  private addTransaction(
    type: transactionType,
    name: string,
    amount: number,
    notification: notificationsTypes,
    date: string
  ): void {
    const transaction: ITransaction = {
      id: `t-${Date.now()}`,
      type,
      fund: name,
      amount,
      notification,
      date
    };
    this._transactions.update(current => [transaction, ...current]);
    this.saveTransactions();
  }

  private currentDate(): string {
    return new Date().toLocaleDateString('es-CO');
  }

  private loadBalance(): number {
    const balance = localStorage.getItem(STORAGE_KEYS.BALANCE_KEY);
    return balance ? Number(balance) : INITIAL_BALANCE;
  }

  private saveBalance(): void {
    localStorage.setItem(STORAGE_KEYS.BALANCE_KEY, String(this._balance()));
  }

  private loadActiveFunds(): IActiveFund[] {
    const funds = localStorage.getItem(STORAGE_KEYS.ACTIVE_FUNDS_KEY);
    return funds ? JSON.parse(funds) : [];
  }

  private saveActiveFunds(): void {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_FUNDS_KEY, JSON.stringify(this._activeFunds()));
  }

  private loadTransactions(): ITransaction[] {
    const transactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS_KEY);
    return transactions ? JSON.parse(transactions) : [];
  }

  private saveTransactions(): void {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS_KEY, JSON.stringify(this._transactions()));
  }
}
