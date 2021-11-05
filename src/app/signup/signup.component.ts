import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private http : HttpClient
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }
  private buildForm(){
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      direccion: ['', [Validators.required]]
    });

  }

  registro(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      console.log(value); // cuando tengamos la api mandamos los datos en el body del post
      this.http.post("http://localhost:3000/registro", value).subscribe(value => console.log(JSON.stringify(value)));
    } else {
      this.form.markAllAsTouched();
    }
  }
}
