import { Injectable } from '@angular/core';
import { localStorageHelper } from '../../helpers/local-storage.helper';
import * as appData from './data.json';

@Injectable({
  providedIn: 'root'
})
export class LocalDbService {
  private readonly DB_INITIALIZED_KEY = 'db_initialized';

  constructor() {}

  init(): void {
    if (localStorageHelper.getItem(this.DB_INITIALIZED_KEY) !== 'true') {
      console.log('Initializing local database from seed data...');
      localStorageHelper.setItem('posts', JSON.stringify(appData.posts));
      localStorageHelper.setItem('currentUser', JSON.stringify(appData.currentUser));
      // You can add more data from data.json to localStorage here
      localStorageHelper.setItem(this.DB_INITIALIZED_KEY, 'true');
    }
  }

  getPosts(): any[] {
    const postsJson = localStorageHelper.getItem('posts');
    return postsJson ? JSON.parse(postsJson) : [];
  }

  updatePost(updatedPost: any): void {
    let posts = this.getPosts();
    const postIndex = posts.findIndex(p => p.id === updatedPost.id);
    if (postIndex > -1) {
      posts[postIndex] = updatedPost;
      localStorageHelper.setItem('posts', JSON.stringify(posts));
    }
  }

  getCurrentUser(): any {
    const userJson = localStorageHelper.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  getLikes(): string[] {
    const likesJson = localStorageHelper.getItem('likes');
    const likes = likesJson ? JSON.parse(likesJson) : [];
    console.log('LocalDbService: getLikes - retrieved:', likes);
    return likes;
  }

  toggleLike(postId: string): void {
    let likes = this.getLikes();
    let posts = this.getPosts();
    const postIndexInLikes = likes.indexOf(postId);
    const postIndexInPosts = posts.findIndex(p => p.id === postId);

    if (postIndexInPosts === -1) {
      console.error('Post not found!');
      return;
    }

    if (postIndexInLikes > -1) {
      // Unlike
      likes.splice(postIndexInLikes, 1);
      posts[postIndexInPosts].likeCount--;
    } else {
      // Like
      likes.push(postId);
      posts[postIndexInPosts].likeCount++;
    }

    localStorageHelper.setItem('likes', JSON.stringify(likes));
    localStorageHelper.setItem('posts', JSON.stringify(posts));
  }

  getComments(postId: string): string[] {
    const commentsJson = localStorageHelper.getItem(`comments_${postId}`);
    return commentsJson ? JSON.parse(commentsJson) : [];
  }

  addComment(postId: string, comment: string): void {
    let comments = this.getComments(postId);
    comments.push(comment);
    localStorageHelper.setItem(`comments_${postId}`, JSON.stringify(comments));
  }

  getDraft(userId: string, postId?: string): any | null {
    const key = postId ? `draft:${userId}:post:${postId}` : `draft:${userId}:new`;
    const draftJson = localStorageHelper.getItem(key);
    return draftJson ? JSON.parse(draftJson) : null;
  }

  saveDraft(userId: string, draft: any, postId?: string): void {
    const key = postId ? `draft:${userId}:post:${postId}` : `draft:${userId}:new`;
    localStorageHelper.setItem(key, JSON.stringify(draft));
  }

  clearDraft(userId: string, postId?: string): void {
    const key = postId ? `draft:${userId}:post:${postId}` : `draft:${userId}:new`;
    localStorageHelper.removeItem(key);
  }
}
