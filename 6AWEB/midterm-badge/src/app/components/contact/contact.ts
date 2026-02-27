import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from '../../pipes/truncate-pipe';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TruncatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };
  showPreview = false;

  onSubmit(): void {
    if (this.formData.name && this.formData.email) {
      this.showPreview = true;
    }
  }
}