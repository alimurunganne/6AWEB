import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PipesDemo } from './pipes-demo/pipes-demo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PipesDemo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mid-project');
}
