import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Post } from '../../services/data.services';
import { TruncatePipe } from '../../pipes/truncate-pipe';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  latestPosts$!: Observable<Post[]>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Uses RxJS map to take first 5 records [cite: 94, 97]
    this.latestPosts$ = this.dataService.getPosts().pipe(
      map(posts => posts.slice(0, 5))
    );
  }
}