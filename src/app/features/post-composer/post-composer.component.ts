import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalDbService } from '../../core/local-db';

/**
 * A component for creating new posts.
 * It includes a form for post title, body, tags, and mood.
 * It also supports saving and loading drafts.
 */
@Component({
  selector: 'app-post-composer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-composer.component.html',
  styleUrls: ['./post-composer.component.css']
})
export class PostComposerComponent implements OnInit {
  /**
   * Event emitter for when a new post is created.
   */
  @Output() postCreated = new EventEmitter<void>();

  title = '';
  body = '';
  tags = '';
  mood = 'funny';
  userId = 'u1'; // Hardcoded for now

  constructor(private db: LocalDbService) {}

  /**
   * Initializes the component by loading a draft if it exists.
   */
  ngOnInit(): void {
    const draft = this.db.getDraft(this.userId);
    if (draft) {
      this.title = draft.title;
      this.body = draft.body;
      this.tags = draft.tags.join(', ');
      this.mood = draft.mood;
    }
  }

  /**
   * Saves the current form state as a draft in localStorage.
   */
  saveDraft(): void {
    const draft = {
      title: this.title,
      body: this.body,
      tags: this.tags.split(',').map(t => t.trim()),
      mood: this.mood,
      updatedAt: new Date().toISOString()
    };
    this.db.saveDraft(this.userId, draft);
  }

  /**
   * Creates a new post and saves it to localStorage.
   * Emits a `postCreated` event and clears the form and the draft.
   */
  createPost(): void {
    if (!this.body.trim()) {
      return; // Basic validation
    }
    // In a real app, you would use a more robust way to generate IDs
    const newPost = {
      id: `p${new Date().getTime()}`,
      authorId: this.userId,
      authorName: 'Binarykeeda', // Hardcoded for now
      team: 'Platform', // Hardcoded for now
      title: this.title,
      body: this.body.trim(),
      tags: this.tags.split(',').map(t => t.trim()),
      mood: this.mood,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      likeCount: 0,
      bookmarkCount: 0,
      flagCount: 0,
      deleted: false
    };

    const posts = this.db.getPosts();
    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));
    this.db.clearDraft(this.userId);
    this.postCreated.emit();
    this.resetForm();
  }

  /**
   * Resets the form to its initial state.
   */
  resetForm(): void {
    this.title = '';
    this.body = '';
    this.tags = '';
    this.mood = 'funny';
  }
}
