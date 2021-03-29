import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-actions',
  templateUrl: './dialog-actions.component.html',
  styleUrls: ['./dialog-actions.component.scss']
})
export class DialogActionsComponent implements OnInit {


  form: FormGroup;
  certificates = ["cert1", "cert2", "cert3"];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      'certificate': ['', [Validators.required]],
      'passwords': this.fb.group({
        'pass1': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        'pass2': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      },
        { validator: this.passwordMatch('pass1', 'pass2') }
      ),
    });
  }

  passwordMatch(field1, field2) {
    return (group) => {
      if (group.get(field1).value !== group.get(field2).value) {
        group.get(field2).setErrors({ notTheSame: true });
      }
      else {
        group.get(field2).setErrors(null);
      }
    }
  }

  sendPass() {

  }



}