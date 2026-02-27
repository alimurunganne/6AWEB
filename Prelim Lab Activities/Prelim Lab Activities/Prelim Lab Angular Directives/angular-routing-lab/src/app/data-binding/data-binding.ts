import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-data-binding',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './data-binding.html',
  styleUrl: './data-binding.css',
})
export class DataBinding {
  message = 'Data Binding Demonstration';
  imageURL = "https://i.imgflip.com/2hgfw.jpg";

  textColor = 'Blue';
  isHighlighted = true;

  yourName = '';  // ← REQUIRED for ngModel

  count = 0;

    increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  // Interpolation
  studentName = "Your name here";
  score = 95;

  // Property binding
  imageUrl = "https://picsum.photos/200";
  isDisabled = true;

  // Attribute binding
  colSpanValue = 3;

  // Class binding
  isPassing = true;

  // Style binding
  boxColor = "purple";
  boxSize = "150px";

}

