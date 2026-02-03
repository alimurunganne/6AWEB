import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { User } from './user.model';
import { Manga } from './manga.model';

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {

  private usersUrl = 'https://jsonplaceholder.typicode.com/users';
  private mangaUrl = 'https://api.jikan.moe/v4/top/manga';

  constructor(private http: HttpClient) { }

  getUsersRemotely(): Observable<User[]> {
    const cachedUsers = localStorage.getItem('users');

    if (cachedUsers) {
      return of(JSON.parse(cachedUsers));
    }

    return this.http.get<User[]>(this.usersUrl).pipe(
      tap(users => localStorage.setItem('users', JSON.stringify(users)))
    );
  }

  // 🔹 FETCH TOP MANGA
  getTopManga(): Observable<any> {
    return this.http.get<any>(this.mangaUrl);
  }
}
