import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalDbService } from '../../core/local-db';
import { UiModalComponent } from '../../shared/ui/ui-modal/ui-modal.component';
import { PostComposerComponent } from '../../features/post-composer/post-composer.component';

interface User {
  id: string;
  name: string;
  team: string;
  avatar: string | null;
  joinedAt: string;
}

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule, UiModalComponent, PostComposerComponent],
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
  @Output() profileClosed = new EventEmitter<void>();
  @Output() postCreated = new EventEmitter<void>(); // Event to notify parent (App component)

  user: User | null = null;
  isComposerOpen = false;

  constructor(private db: LocalDbService) {}

  ngOnInit(): void {
    this.user = this.db.getCurrentUser();
  }

  closeProfile(): void {
    this.profileClosed.emit();
  }

  openComposer(): void {
    this.isComposerOpen = true;
  }

  closeComposer(): void {
    this.isComposerOpen = false;
  }

  onPostCreated(): void {
    this.closeComposer();
    this.postCreated.emit(); // Emit to parent to reload feed
  }
}
