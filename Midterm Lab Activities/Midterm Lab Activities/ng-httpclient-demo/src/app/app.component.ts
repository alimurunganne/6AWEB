import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpclientService } from './httpclient.service';
import { User } from './user.model';
import { Manga } from './manga.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AppComponent implements OnInit {

  users: User[] = [];
  manga: Manga[] = [];

  constructor(private httpClient: HttpclientService) {}

  ngOnInit(): void {
    this.httpClient.getUsersRemotely().subscribe(data => {
      this.users = data;
    });

    // 🔹 LIMIT to TOP 5
    this.httpClient.getTopManga().subscribe((res: any) => {
      this.manga = res.data.slice(0, 5);  // <-- TOP 5 is here
    });
  }
}
