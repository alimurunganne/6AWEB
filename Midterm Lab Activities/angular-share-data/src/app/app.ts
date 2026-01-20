import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Employee } from './employee';
import { ProductService } from './product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  protected readonly title = signal('angular-share-data');

  employees: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
  }[] = [];

  products: {
    id: string;
    name: string;
    description: string;
    price: number;
  }[] = [];

  constructor(
    private employeeService: Employee,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
    this.products = this.productService.getProducts();
  }
}
