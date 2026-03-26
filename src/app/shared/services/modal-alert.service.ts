import { Injectable, signal } from '@angular/core';
import { IModalData } from '../interfaces/modal.interface';

@Injectable({
  providedIn: 'root',
})
export class ModalAlertService {
  private readonly _modal = signal<IModalData | null>(null);

  readonly modal = this._modal.asReadonly();

  public show(data: IModalData): void {
    this._modal.set(data);
  }

  public close(): void {
    this._modal.set(null);
  }

}
