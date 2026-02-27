import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, Post } from '../../services/data.services';
import { TruncatePipe } from '../../pipes/truncate-pipe';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule, TruncatePipe],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class ServicesComponent implements OnInit {
  filteredPosts$!: Observable<Post[]>;
  private searchSubject = new BehaviorSubject<string>('');
  searchTerm: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.filteredPosts$ = combineLatest([
      this.dataService.getPosts(),
      this.searchSubject.asObservable()
    ]).pipe(
      map(([posts, search]: [Post[], string]) => {
        if (!search.trim()) return posts;
        const lowerSearch = search.toLowerCase();
        return posts.filter((post: Post) => 
          post.title.toLowerCase().includes(lowerSearch) || 
          post.body.toLowerCase().includes(lowerSearch)
        );
      })
    );
  }

  onSearchChange() {
    this.searchSubject.next(this.searchTerm);
  }
}