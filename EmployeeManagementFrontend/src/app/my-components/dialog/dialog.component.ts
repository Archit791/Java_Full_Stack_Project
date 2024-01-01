import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/my-services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(128)]],
      lastName: ['', [Validators.required, Validators.maxLength(128)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
    });

    if (this.data) {
      this.patchFormValues(this.data);
    }
  }

  onSubmit() {
    if (this.userForm.valid && !this.data) {
      var formvalue = this.userForm.value;
      console.log(formvalue);

      this.apiService.postNewUser(formvalue).subscribe({
        next: (response) => {},
        error: () => {},
      });

      window.location.reload();
    }
    if (this.userForm.valid && this.data) {
      var formvalue = this.userForm.value;
      formvalue['id'] = this.data.id;
      console.log(formvalue);

      this.apiService.editOldUser(formvalue, this.data.id).subscribe({
        next: (response) => {},
        error: () => {},
      });
      window.location.reload();
    }
  }

  patchFormValues(data: any) {
    this.userForm.patchValue({
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      email: this.data.email,
      phoneNumber: this.data.phoneNumber,
    });
  }

  get firstName() {
    return this.userForm.get('firstName')!;
  }

  get lastName() {
    return this.userForm.get('lastName')!;
  }

  get email() {
    return this.userForm.get('email')!;
  }

  get phoneNumber() {
    return this.userForm.get('phoneNumber')!;
  }
}
