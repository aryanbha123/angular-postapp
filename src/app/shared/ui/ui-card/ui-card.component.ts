import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

/**
 * A reusable UI card component for displaying a post.
 * It shows the post's title, content, author, and interactions (like and comment).
 */
@Component({
  selector: 'app-ui-card',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule here
  templateUrl: './ui-card.component.html',
  styleUrls: ['./ui-card.component.css']
})
export class UiCardComponent implements OnInit { // Implement OnInit
  /** The title of the post. */
  @Input() title: string | null = 'Default Title';
  /** The number of likes on the post. */
  @Input() likeCount: number = 0;
  /** The number of comments on the post. */
  @Input() commentCount: number = 0;
  /** Whether the current user has liked the post. */
  @Input() isLiked: boolean = false;
  /** The ID of the post. */
  @Input() postId: string = ''; // Added to identify the post for comments
  /** An array of comments on the post. */
  @Input() comments: string[] = []; // New input for comments

  // New @Input properties for post metadata
  /** The name of the post's author. */
  @Input() authorName: string = '';
  /** The team of the post's author. */
  @Input() authorTeam: string = '';
  /** The time since the post was created (e.g., "5m ago"). */
  @Input() timeAgo: string = 'Just now'; // Placeholder for relative time
  /** The initial of the current user's name. */
  @Input() currentUserInitial: string = 'M'; // Placeholder for current user's initial

  /** Event emitter for when the like button is clicked. */
  @Output() liked = new EventEmitter<void>();
  /** Event emitter for when a new comment is submitted. */
  @Output() commentSubmitted = new EventEmitter<{ postId: string, commentText: string }>(); // Modified output

  internalCommentText: string = ''; // Internal state for comment input
  private likeSound: HTMLAudioElement | undefined; // Audio element for like sound
  private commentSound: HTMLAudioElement | undefined; // Audio element for comment sound

  /**
   * Initializes the component by creating audio elements for like and comment sounds.
   */
  ngOnInit(): void {
    // Initialize audio element when component is initialized
    if (typeof Audio !== 'undefined') {
      this.likeSound = new Audio('/assets/sounds/like.mp3');
      this.commentSound = new Audio('/assets/sounds/comment.mp3'); // Initialize comment sound
    }
  }

  /**
   * Handles the click event on the like button.
   * Emits the `liked` event and plays a sound.
   */
  onLike(): void {
    this.liked.emit();
    if (this.likeSound) {
      this.likeSound.play().catch(e => console.error('Error playing like sound:', e));
    }
  }

  /**
   * Handles the submission of a new comment.
   * Emits the `commentSubmitted` event with the post ID and comment text,
   * clears the input field, and plays a sound.
   */
  onCommentSubmit(): void {
    if (this.internalCommentText.trim()) {
      this.commentSubmitted.emit({ postId: this.postId, commentText: this.internalCommentText.trim() });
      this.internalCommentText = ''; // Clear input after submitting
      if (this.commentSound) {
        this.commentSound.play().then(() => {
          setTimeout(() => {
            if (this.commentSound) {
              this.commentSound.pause();
              this.commentSound.currentTime = 0; // Reset for next play
            }
          }, 2000); // 2 seconds
        }).catch(e => console.error('Error playing comment sound:', e));
      }
    }
  }

  // Placeholder methods for comment metadata
  /**
   * Gets the author of a comment.
   * @param index The index of the comment.
   * @returns The author's name.
   */
  getCommentAuthor(index: number): string {
    // In a real app, this would come from a comment object, not just an index
    return 'Commenter';
  }

  /**
   * Gets the initial of the author of a comment.
   * @param index The index of the comment.
   * @returns The first letter of the author's name.
   */
  getCommentAuthorInitial(index: number): string {
    return this.getCommentAuthor(index).charAt(0);
  }

  /**
   * Gets the time since a comment was posted.
   * @param index The index of the comment.
   * @returns A string representing the time ago.
   */
  getCommentTime(index: number): string {
    // In a real app, this would be a calculated relative time
    return `${index + 1}m ago`;
  }
}
