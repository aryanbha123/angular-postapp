import { Injectable } from '@angular/core';
import { localStorageHelper } from '../../helpers/local-storage.helper';
import * as appData from './data.json';

/**
 * Service for managing local data using localStorage.
 * This service handles initialization of the local database from a JSON file,
 * and provides methods for CRUD operations on posts, likes, comments, and drafts.
 */
@Injectable({
  providedIn: 'root'
})
export class LocalDbService {
  private readonly DB_INITIALIZED_KEY = 'db_initialized';

  constructor() {}

  /**
   * Initializes the local database from a seed JSON file if it hasn't been initialized before.
   */
  init(): void {
    if (localStorageHelper.getItem(this.DB_INITIALIZED_KEY) !== 'true') {
      console.log('Initializing local database from seed data...');
      localStorageHelper.setItem('posts', JSON.stringify(appData.posts));
      localStorageHelper.setItem('currentUser', JSON.stringify(appData.currentUser));
      // You can add more data from data.json to localStorage here
      localStorageHelper.setItem(this.DB_INITIALIZED_KEY, 'true');
    }
  }

  /**
   * Retrieves all posts from localStorage.
   * @returns An array of post objects.
   */
  getPosts(): any[] {
    const postsJson = localStorageHelper.getItem('posts');
    return postsJson ? JSON.parse(postsJson) : [];
  }

  /**
   * Updates a specific post in localStorage.
   * @param updatedPost The post object with updated data.
   */
  updatePost(updatedPost: any): void {
    let posts = this.getPosts();
    const postIndex = posts.findIndex(p => p.id === updatedPost.id);
    if (postIndex > -1) {
      posts[postIndex] = updatedPost;
      localStorageHelper.setItem('posts', JSON.stringify(posts));
    }
  }

  /**
   * Retrieves the current user from localStorage.
   * @returns The current user object.
   */
  getCurrentUser(): any {
    const userJson = localStorageHelper.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  /**
   * Retrieves the list of liked post IDs from localStorage.
   * @returns An array of liked post IDs.
   */
  getLikes(): string[] {
    const likesJson = localStorageHelper.getItem('likes');
    const likes = likesJson ? JSON.parse(likesJson) : [];
    console.log('LocalDbService: getLikes - retrieved:', likes);
    return likes;
  }

  /**
   * Toggles the like status of a post.
   * Adds or removes the post ID from the list of liked posts and updates the like count on the post object.
   * @param postId The ID of the post to like or unlike.
   */
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

  /**
   * Retrieves all comments for a specific post from localStorage.
   * @param postId The ID of the post to get comments for.
   * @returns An array of comments.
   */
  getComments(postId: string): string[] {
    const commentsJson = localStorageHelper.getItem(`comments_${postId}`);
    return commentsJson ? JSON.parse(commentsJson) : [];
  }

  /**
   * Adds a comment to a specific post in localStorage.
   * @param postId The ID of the post to add a comment to.
   * @param comment The comment text.
   */
  addComment(postId: string, comment: string): void {
    let comments = this.getComments(postId);
    comments.push(comment);
    localStorageHelper.setItem(`comments_${postId}`, JSON.stringify(comments));
  }

  /**
   * Retrieves a draft for a new or existing post from localStorage.
   * @param userId The ID of the user who owns the draft.
   * @param postId Optional ID of the post being edited. If not provided, retrieves the draft for a new post.
   * @returns The draft object, or null if no draft is found.
   */
  getDraft(userId: string, postId?: string): any | null {
    const key = postId ? `draft:${userId}:post:${postId}` : `draft:${userId}:new`;
    const draftJson = localStorageHelper.getItem(key);
    return draftJson ? JSON.parse(draftJson) : null;
  }

  /**
   * Saves a draft for a new or existing post to localStorage.
   * @param userId The ID of the user who owns the draft.
   * @param draft The draft object to save.
   * @param postId Optional ID of the post being edited. If not provided, saves the draft for a new post.
   */
  saveDraft(userId: string, draft: any, postId?: string): void {
    const key = postId ? `draft:${userId}:post:${postId}` : `draft:${userId}:new`;
    localStorageHelper.setItem(key, JSON.stringify(draft));
  }

  /**
   * Clears a draft for a new or existing post from localStorage.
   * @param userId The ID of the user who owns the draft.
   * @param postId Optional ID of the post being edited. If not provided, clears the draft for a new post.
   */
  clearDraft(userId: string, postId?: string): void {
    const key = postId ? `draft:${userId}:post:${postId}` : `draft:${userId}:new`;
    localStorageHelper.removeItem(key);
  }
}
