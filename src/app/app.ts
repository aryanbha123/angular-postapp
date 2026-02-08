import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FeedComponent } from './pages/feed/feed.component';
import { LocalDbService } from './core/local-db';
import { HeaderComponent } from './shared/header/header.component';
import { ProfileCardComponent } from './user/profile-card/profile-card.component';
import { UiModalComponent } from './shared/ui/ui-modal/ui-modal.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FeedComponent, HeaderComponent, ProfileCardComponent, UiModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('post-application');
  isProfileOpen = false;

  @ViewChild(FeedComponent) feedComponent!: FeedComponent;

  constructor(private db: LocalDbService) {}

  ngOnInit(): void {
    this.db.init();
  }

  openProfile(): void {
    this.isProfileOpen = true;
  }

  closeProfile(): void {
    this.isProfileOpen = false;
  }

  onPostCreatedFromProfile(): void {
    this.closeProfile();
    this.feedComponent.loadPosts(); // Reload posts in FeedComponent
  }
}
