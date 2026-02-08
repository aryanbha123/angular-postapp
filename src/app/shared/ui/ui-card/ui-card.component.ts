import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-ui-card',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule here
  templateUrl: './ui-card.component.html',
  styleUrls: ['./ui-card.component.css']
})
export class UiCardComponent implements OnInit { // Implement OnInit
  @Input() title: string | null = 'Default Title';
  @Input() likeCount: number = 0;
  @Input() commentCount: number = 0;
  @Input() isLiked: boolean = false;
  @Input() postId: string = ''; // Added to identify the post for comments
  @Input() comments: string[] = []; // New input for comments

  // New @Input properties for post metadata
  @Input() authorName: string = '';
  @Input() authorTeam: string = '';
  @Input() timeAgo: string = 'Just now'; // Placeholder for relative time
  @Input() currentUserInitial: string = 'M'; // Placeholder for current user's initial

  @Output() liked = new EventEmitter<void>();
  @Output() commentSubmitted = new EventEmitter<{ postId: string, commentText: string }>(); // Modified output

  internalCommentText: string = ''; // Internal state for comment input
  private likeSound: HTMLAudioElement | undefined; // Audio element for like sound
  private commentSound: HTMLAudioElement | undefined; // Audio element for comment sound

  ngOnInit(): void {
    // Initialize audio element when component is initialized
    if (typeof Audio !== 'undefined') {
      this.likeSound = new Audio('/assets/sounds/like.mp3');
      this.commentSound = new Audio('/assets/sounds/comment.mp3'); // Initialize comment sound
    }
  }

  onLike(): void {
    this.liked.emit();
    if (this.likeSound) {
      this.likeSound.play().catch(e => console.error('Error playing like sound:', e));
    }
  }

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
  getCommentAuthor(index: number): string {
    // In a real app, this would come from a comment object, not just an index
    return 'Commenter';
  }

  getCommentAuthorInitial(index: number): string {
    return this.getCommentAuthor(index).charAt(0);
  }

  getCommentTime(index: number): string {
    // In a real app, this would be a calculated relative time
    return `${index + 1}m ago`;
  }
}
