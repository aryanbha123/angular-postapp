import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalDbService } from '../../core/local-db';
import { UiModalComponent } from '../../shared/ui/ui-modal/ui-modal.component';
import { PostComposerComponent } from '../../features/post-composer/post-composer.component';

/**
 * Interface representing a user object.
 */
interface User {
  id: string;
  name: string;
  team: string;
  avatar: string | null;
  joinedAt: string;
}

/**
 * Component for displaying a user's profile card.
 * It shows user information and provides an option to create a new post.
 */
@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule, UiModalComponent, PostComposerComponent],
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
  /** Event emitter for when the profile card is closed. */
  @Output() profileClosed = new EventEmitter<void>();
  /** Event emitter for when a new post is created. */
  @Output() postCreated = new EventEmitter<void>(); // Event to notify parent (App component)

  user: User | null = null;
  isComposerOpen = false;

  constructor(private db: LocalDbService) {}

  /**
   * Initializes the component by loading the current user's data.
   */
  ngOnInit(): void {
    this.user = this.db.getCurrentUser();
  }

  /**
   * Emits the `profileClosed` event to close the profile card.
   */
  closeProfile(): void {
    this.profileClosed.emit();
  }

  /**
   * Opens the post composer modal.
   */
  openComposer(): void {
    this.isComposerOpen = true;
  }

  /**
   * Closes the post composer modal.
   */
  closeComposer(): void {
    this.isComposerOpen = false;
  }

  /**
   * Handles the creation of a new post.
   * Closes the composer and emits the `postCreated` event.
   */
  onPostCreated(): void {
    this.closeComposer();
    this.postCreated.emit(); // Emit to parent to reload feed
  }
}
