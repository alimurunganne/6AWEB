import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';           // NEW
import { MatSelectModule } from '@angular/material/select';         // NEW
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // NEW
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSliderModule,
    MatDividerModule,
    MatTooltipModule,
    MatChipsModule,       // NEW
    MatSelectModule,      // NEW
    MatSlideToggleModule, // NEW
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly dialog = inject(MatDialog);

  name = '';
  address = '';
  gender = '';
  birthDate: Date | null = null;
  readonly animal = signal('');

  // Password visibility
  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  // Slider
  sliderValue = signal(6);

  // Email Validation
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  errorMessage = signal('');

  // Password Validation
  readonly password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  passwordErrorMessage = signal('');

  // Submitted data
  submittedData = signal<any>(null);

  // ── NEW: Select (Country) ──────────────────────────────────────
  country = '';
  readonly countries = [
    { code: 'PH', label: 'Philippines' },
    { code: 'US', label: 'United States' },
    { code: 'GB', label: 'United Kingdom' },
    { code: 'JP', label: 'Japan' },
    { code: 'AU', label: 'Australia' },
    { code: 'CA', label: 'Canada' },
    { code: 'DE', label: 'Germany' },
    { code: 'FR', label: 'France' },
    { code: 'SG', label: 'Singapore' },
    { code: 'IN', label: 'India' },
  ];

  // ── NEW: Chips (Interests) ─────────────────────────────────────
  readonly allInterests = ['UI/UX', 'Backend', 'DevOps', 'Mobile', 'AI/ML', 'Security', 'Cloud'];
  selectedInterests: string[] = [];

  toggleInterest(interest: string) {
    const idx = this.selectedInterests.indexOf(interest);
    if (idx >= 0) {
      this.selectedInterests.splice(idx, 1);
    } else {
      this.selectedInterests.push(interest);
    }
  }

  isSelected(interest: string): boolean {
    return this.selectedInterests.includes(interest);
  }

  // ── NEW: Slide Toggle (Newsletter) ────────────────────────────
  newsletter = false;

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordErrorMessage());
  }

  get isFormFilled(): boolean {
    return (
      this.name.trim() !== '' &&
      !!this.email.value?.trim() &&
      !!this.password.value?.trim() &&
      this.address.trim() !== ''
    );
  }

  getGenderLabel(): string {
    if (this.gender === '1') return 'Male';
    if (this.gender === '2') return 'Female';
    if (this.gender === '3') return 'Others';
    return '';
  }

  formatDate(date: Date | null): string {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit',
    }).format(date);
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  updatePasswordErrorMessage() {
    if (this.password.hasError('required')) {
      this.passwordErrorMessage.set('Password is required');
    } else if (this.password.hasError('minlength')) {
      this.passwordErrorMessage.set('Password must be at least 8 characters long');
    } else {
      this.passwordErrorMessage.set('');
    }
  }

  onSubmit() {
    this.email.markAsTouched();
    this.password.markAsTouched();
    this.updateErrorMessage();
    this.updatePasswordErrorMessage();

    if (this.email.valid && this.password.valid) {
      this.submittedData.set({
        name: this.name,
        email: this.email.value,
        password: this.password.value,
        gender: this.getGenderLabel(),
        address: this.address,
        birthDate: this.formatDate(this.birthDate),
        skillLevel: this.sliderValue(),
        country: this.countries.find(c => c.code === this.country)?.label || '',
        interests: this.selectedInterests.join(', ') || '—',
        newsletter: this.newsletter ? 'Yes' : 'No',
      });
    }
  }
}