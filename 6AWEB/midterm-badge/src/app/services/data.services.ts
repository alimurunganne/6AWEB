import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);
  private url = 'https://jsonplaceholder.typicode.com/posts';

  // Implements caching with shareReplay(1) to prevent duplicate calls
  private posts$ = this.http.get<Post[]>(this.url).pipe(shareReplay(1));

  getPosts(): Observable<Post[]> {
    return this.posts$;
  }
}