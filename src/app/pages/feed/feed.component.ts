import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalDbService } from '../../core/local-db';
import { FormsModule } from '@angular/forms';
import { UiCardComponent } from '../../shared/ui/ui-card/ui-card.component';
// Removed UiModalComponent and PostComposerComponent imports

// Define the Post interface
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
  authorTeam: string;  // Add this
  timeAgo: string;     
}


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

  ngOnInit(): void {
    this.loadPosts();
  }

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

  onLiked(postId: string): void {
    this.db.toggleLike(postId);
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      console.log(`FeedComponent: onLiked - Post ${postId} - isLiked: ${post.isLiked}, likeCount: ${post.likeCount}`);
    }
    this.loadPosts();
  }

  onCommentSubmitted(event: { postId: string, commentText: string }): void {
    const { postId, commentText } = event;
    if (commentText.trim()) {
      this.db.addComment(postId, commentText.trim());
      this.loadPosts();
    }
  }

  trackByPostId(index: number, post: Post): string {
    return post.id;
  }
}
