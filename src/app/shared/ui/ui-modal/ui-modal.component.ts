import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * A reusable UI modal component.
 * It can be opened and closed, and displays a title and content.
 */
@Component({
  selector: 'app-ui-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-modal.component.html',
  styleUrls: ['./ui-modal.component.css']
})
export class UiModalComponent {
  /** Whether the modal is open. */
  @Input() isOpen = false;
  /** The title of the modal. */
  @Input() title = 'Modal Title';
  /** Event emitter for when the modal is closed. */
  @Output() closed = new EventEmitter<void>();

  /**
   * Closes the modal and emits the `closed` event.
   */
  close(): void {
    this.isOpen = false;
    this.closed.emit();
  }
}
