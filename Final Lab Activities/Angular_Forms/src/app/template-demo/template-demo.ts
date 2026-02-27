import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template-demo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './template-demo.html',
  styleUrl: './template-demo.css'
})
export class TemplateDemo {
  title = 'Template Driven Demo';

  // Original fields
  username = '';
  email = '';
  password = '';
  role = '';
  gender = '';
  status = '';
  comments = '';

  // 3 New fields
  age: number | null = null;
  department = '';
  agreeToTerms = false;

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  onReset() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.role = '';
    this.gender = '';
    this.status = '';
    this.comments = '';
    this.age = null;
    this.department = '';
    this.agreeToTerms = false;
    this.submitted = false;
  }
}
