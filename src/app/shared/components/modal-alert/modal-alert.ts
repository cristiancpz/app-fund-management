import { Component, computed, inject, output } from '@angular/core';
import { ModalAlertService } from '../../services/modal-alert.service';
import { MODAL_TYPE } from '../../consts/modal.const';

@Component({
  selector: 'app-modal-alert',
  imports: [],
  templateUrl: './modal-alert.html',
  styleUrl: './modal-alert.scss',
})
export class ModalAlert {
  private readonly modalService = inject(ModalAlertService);

  closed = output<boolean>();
  actionBtn = output<void>();

  modalType = MODAL_TYPE;
  modal = computed(() => this.modalService.modal());

  onClose(): void {
    this.modalService.close();
    this.closed.emit(false);
  }

  onAction(): void {
    this.modal()?.actionBtn?.();
    this.actionBtn.emit();
    this.onClose();
  }

}
