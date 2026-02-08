import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalDbService } from '../../core/local-db';
import { FormsModule } from '@angular/forms';
import { UiCardComponent } from '../../shared/ui/ui-card/ui-card.component';
// Removed UiModalComponent and PostComposerComponent imports

/**
 * Interface representing a post object.
 */
interface Post {
  id: string;
  authorId: string;
  authorName: string;
  team: string;
  title: string | null;
  body: string;
  tags: string[];
  mood: string;
  createdAt: string;
  updatedAt: string | null;
  likeCount: number;
  bookmarkCount: number;
  flagCount: number;
  deleted: boolean;
  isLiked: boolean;
  comments: string[];
  authorTeam: string;
  timeAgo: string;
}

/**
 * Component for displaying the feed of posts.
 * It handles loading, filtering, sorting, and interacting with posts.
 */
@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule, UiCardComponent], // Removed UiModalComponent and PostComposerComponent
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  posts: Post[] = [];
  // Removed commentText: { [key: string]: string } = {};

  // Search, Filter, Sort properties
  searchTerm = '';
  sortBy = 'newest';
  teamFilter = '';
  isLoading: boolean = false;

  constructor(private db: LocalDbService) { }

  /**
   * Initializes the component by loading the posts.
   */
  ngOnInit(): void {
    this.loadPosts();
  }

  /**
   * Loads posts from the local database, applies search, filter, and sort, and updates the component's state.
   */
  loadPosts(): void {
    const likedPosts = this.db.getLikes();
    console.log('FeedComponent: loadPosts - likedPosts from DB:', likedPosts);

    let posts = this.db.getPosts().map((post: any) => ({
      ...post,
      isLiked: likedPosts.includes(post.id),
      comments: this.db.getComments(post.id)
    }));

    console.log('FeedComponent: loadPosts - posts before filter/sort:', JSON.parse(JSON.stringify(posts)));

    // Apply search
    if (this.searchTerm) {
      posts = posts.filter(post =>
        post.title?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Apply team filter
    if (this.teamFilter) {
      posts = posts.filter(post => post.team === this.teamFilter);
    }

    // Apply sort
    posts.sort((a, b) => {
      if (this.sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
    });

    this.posts = posts;
    console.log('FeedComponent: loadPosts - posts after filter/sort:', JSON.parse(JSON.stringify(this.posts)));
  }

  /**
   * Handles the like/unlike action on a post.
   * @param postId The ID of the post that was liked/unliked.
   */
  onLiked(postId: string): void {
    this.db.toggleLike(postId);
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      console.log(`FeedComponent: onLiked - Post ${postId} - isLiked: ${post.isLiked}, likeCount: ${post.likeCount}`);
    }
    this.loadPosts();
  }

  /**
   * Handles the submission of a new comment on a post.
   * @param event An object containing the postId and the commentText.
   */
  onCommentSubmitted(event: { postId: string, commentText: string }): void {
    const { postId, commentText } = event;
    if (commentText.trim()) {
      this.db.addComment(postId, commentText.trim());
      this.loadPosts();
    }
  }

  /**
   * TrackBy function for the posts list to improve performance.
   * @param index The index of the item.
   * @param post The post object.
   * @returns The unique ID of the post.
   */
  trackByPostId(index: number, post: Post): string {
    return post.id;
  }
}
