import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reactive-demo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-demo.html',
  styleUrl: './reactive-demo.css'
})
export class ReactiveDemo {
  roles = ['Admin', 'User', 'Guest'];
  genders = ['Male', 'Female', 'Other'];
  statuses = ['Permanent', 'Probationary'];
  departments = ['Engineering', 'Human Resources', 'Finance', 'Marketing', 'Operations', 'IT'];

  form!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      // Original fields
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]{4,12}$/)]],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]],
      role:     ['Admin', Validators.required],
      gender:   ['', Validators.required],
      status:   ['', Validators.required],
      comments: [''],

      // 3 New fields
      age:        [null, [Validators.required, Validators.min(18), Validators.max(65)]],
      department: ['',   Validators.required],
      agreeToTerms: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.submitted = true;
      console.log(this.form.value);
    }
  }

  onReset() {
    this.form.reset({ role: 'Admin', agreeToTerms: false });
    this.submitted = false;
  }

  isInvalid(name: string) {
    const control = this.form.get(name);
    return control?.touched && control?.invalid;
  }

  getError(name: string, error: string) {
    return this.form.get(name)?.hasError(error);
  }
}
