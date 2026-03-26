import { ModalAlertService } from './shared/services/modal-alert.service';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './shared/components/sidebar/sidebar';
import { ModalAlert } from './shared/components/modal-alert/modal-alert';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Sidebar,
    ModalAlert
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly modalAlertService = inject(ModalAlertService);

  modal = computed(() => this.modalAlertService.modal());

  protected readonly title = signal('app-funds-management');
}
