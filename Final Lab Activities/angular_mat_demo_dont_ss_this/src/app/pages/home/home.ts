import {
  ChangeDetectionStrategy,
  Component,
  signal,
  computed,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/* ─────────────────────────────────────────
   CUSTOM VALIDATORS
───────────────────────────────────────── */

/** Alphanumeric only, min 8 chars, must start with a letter */
function luxPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const val: string = control.value ?? '';
  if (!val) return null;

  const startsWithLetter = /^[a-zA-Z]/.test(val);
  const alphanumericOnly = /^[a-zA-Z0-9]+$/.test(val);
  const minLength = val.length >= 8;

  if (!startsWithLetter) return { startsWithLetter: true };
  if (!alphanumericOnly)  return { alphanumeric: true };
  if (!minLength)         return { minlength: true };
  return null;
}

/** Birth year must be 2006 or earlier */
function maxBirthYearValidator(control: AbstractControl): ValidationErrors | null {
  const val: string = control.value ?? '';
  if (!val) return null;
  const year = new Date(val).getFullYear();
  if (year > 2006) return { birthYearTooRecent: true };
  return null;
}

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  /* ── Dark Mode ── */
  isDarkMode = signal(false);

  toggleDarkMode() {
    this.isDarkMode.set(!this.isDarkMode());
  }

  /* ── Form Fields ── */
  fullName       = '';
  gender         = '';
  birthDate      = '';
  nationality    = '';
  phone          = '';
  membershipTier = '';
  roomPreference = '';
  specialRequests = '';

  /* ── Password visibility ── */
  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  /* ── Touched flags ── */
  emailTouched    = false;
  passwordTouched = false;
  dobTouched      = false;

  /* ── DOB constraints ── */
  readonly maxDobYear = 2006;
  readonly maxDobDate = `${this.maxDobYear}-12-31`; // HTML max attribute

  /* ── Email FormControl ── */
  readonly email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  errorMessage = signal('');

  /* ── Password FormControl ── */
  readonly password = new FormControl('', [
    Validators.required,
    luxPasswordValidator,
  ]);
  passwordErrorMessage = signal('');

  /* ── DOB FormControl ── */
  readonly dob = new FormControl('', [
    Validators.required,
    maxBirthYearValidator,
  ]);
  dobErrorMessage = signal('');

  /* ── Password rules live feedback ── */
  pwRules = {
    minLength: false,
    startsWithLetter: false,
    alphanumeric: false,
  };

  /* ── Submitted data ── */
  submittedData = signal<any>(null);

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updatePasswordErrorMessage();
        this.updatePwRules();
      });

    merge(this.dob.statusChanges, this.dob.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateDobErrorMessage());
  }

  /* ── Blur handlers ── */
  onEmailBlur() {
    this.emailTouched = true;
    this.email.markAsTouched();
    this.updateErrorMessage();
  }

  onPasswordBlur() {
    this.passwordTouched = true;
    this.password.markAsTouched();
    this.updatePasswordErrorMessage();
  }

  onDobBlur() {
    this.dobTouched = true;
    this.dob.markAsTouched();
    this.updateDobErrorMessage();
  }

  onDobChange() {
    this.dob.setValue(this.birthDate);
    this.dobTouched = true;
    this.updateDobErrorMessage();
  }

  /* ── Validation message updaters ── */
  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('Email address is required');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Please enter a valid email address');
    } else {
      this.errorMessage.set('');
    }
  }

  updatePasswordErrorMessage() {
    if (this.password.hasError('required')) {
      this.passwordErrorMessage.set('Password is required');
    } else if (this.password.hasError('startsWithLetter')) {
      this.passwordErrorMessage.set('Password must begin with a letter');
    } else if (this.password.hasError('alphanumeric')) {
      this.passwordErrorMessage.set('Only letters and numbers are allowed');
    } else if (this.password.hasError('minlength')) {
      this.passwordErrorMessage.set('Password must be at least 8 characters');
    } else {
      this.passwordErrorMessage.set('');
    }
  }

  updateDobErrorMessage() {
    if (this.dob.hasError('required')) {
      this.dobErrorMessage.set('Date of birth is required');
    } else if (this.dob.hasError('birthYearTooRecent')) {
      this.dobErrorMessage.set(`Guests must be born in ${this.maxDobYear} or earlier`);
    } else {
      this.dobErrorMessage.set('');
    }
  }

  /* ── Live password rules ── */
  updatePwRules() {
    const val: string = this.password.value ?? '';
    this.pwRules = {
      minLength:        val.length >= 8,
      startsWithLetter: /^[a-zA-Z]/.test(val),
      alphanumeric:     /^[a-zA-Z0-9]+$/.test(val) && val.length > 0,
    };
  }

  /* ── Gender display ── */
  getGenderLabel(): string {
    return this.gender || '—';
  }

  /* ── Date formatting ── */
  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(d);
  }

  /* ── Form filled check ── */
  get isFormFilled(): boolean {
    return (
      this.fullName.trim() !== '' &&
      !!this.email.value?.trim() &&
      this.email.valid &&
      !!this.password.value?.trim() &&
      this.password.valid &&
      this.birthDate !== '' &&
      !this.dob.hasError('birthYearTooRecent') &&
      this.membershipTier !== ''
    );
  }

  /* ── Submit ── */
  onSubmit() {
    this.emailTouched    = true;
    this.passwordTouched = true;
    this.dobTouched      = true;

    this.email.markAsTouched();
    this.password.markAsTouched();
    this.dob.setValue(this.birthDate);
    this.dob.markAsTouched();

    this.updateErrorMessage();
    this.updatePasswordErrorMessage();
    this.updateDobErrorMessage();

    if (!this.isFormFilled) return;

    this.submittedData.set({
      fullName:        this.fullName,
      email:           this.email.value,
      password:        this.password.value,
      gender:          this.getGenderLabel(),
      birthDate:       this.formatDate(this.birthDate),
      nationality:     this.nationality,
      phone:           this.phone,
      membershipTier:  this.membershipTier,
      roomPreference:  this.roomPreference || '—',
      specialRequests: this.specialRequests,
    });
  }
}