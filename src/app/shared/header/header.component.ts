import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * The header component for the application.
 * It displays the application title and a profile icon.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  /**
   * Event emitter for when the profile icon is clicked.
   */
  @Output() profileIconClicked = new EventEmitter<void>();

  /**
   * Emits the `profileIconClicked` event when the profile icon is clicked.
   */
  onProfileClick(): void {
    this.profileIconClicked.emit();
  }
}
