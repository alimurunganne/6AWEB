import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private readonly API = 'http://localhost:5038/api/books/';

  books: any[] = [];

  newTitle = ''; newDesc = ''; newPrice: number | null = null;
  newAuthor = ''; newCategory = '';

  editingId: any = null;
  editTitle = ''; editDesc = ''; editPrice: number | null = null;
  editAuthor = ''; editCategory = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.http.get<any[]>(this.API + 'GetBooks')
      .subscribe(data => this.books = data);
  }

  addBook(): void {
    if (!this.newTitle || !this.newDesc || !this.newPrice || !this.newAuthor || !this.newCategory) {
      alert('Please fill all fields');
      return;
    }

    this.http.post(this.API + 'AddBook', {
      title: this.newTitle,
      desc: this.newDesc,
      price: this.newPrice,
      author: this.newAuthor,
      category: this.newCategory
    }).subscribe(() => {
      this.loadBooks();
      this.clearForm();
    });
  }

  startEdit(book: any): void {
    this.editingId = book.id;
    this.editTitle = book.title;
    this.editDesc = book.desc;
    this.editPrice = book.price;
    this.editAuthor = book.author;
    this.editCategory = book.category;
  }

  saveEdit(id: any): void {
    if (!this.editTitle || !this.editDesc || !this.editPrice || !this.editAuthor || !this.editCategory) {
      alert('Please fill all fields');
      return;
    }

    this.http.put(this.API + 'UpdateBook?id=' + id, {
      title: this.editTitle,
      desc: this.editDesc,
      price: this.editPrice,
      author: this.editAuthor,
      category: this.editCategory
    }).subscribe(() => {
      this.cancelEdit();
      this.loadBooks();
    });
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editTitle = ''; this.editDesc = '';
    this.editPrice = null; this.editAuthor = ''; this.editCategory = '';
  }

  deleteBook(id: any): void {
    this.http.delete(this.API + 'DeleteBook?id=' + id)
      .subscribe(() => this.loadBooks());
  }

  private clearForm(): void {
    this.newTitle = ''; this.newDesc = '';
    this.newPrice = null; this.newAuthor = ''; this.newCategory = '';
  }
}