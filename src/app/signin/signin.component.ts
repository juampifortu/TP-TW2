import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  iniciar(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      console.log(value); // cuando tengamos la api mandamos los datos en el body del post
      this.http.post("http://localhost:3000/login", value).subscribe(value => console.log(JSON.stringify(value)));
      

    } else {
      this.form.markAllAsTouched();
    }
 
  }

}
/*
2018 0 Colombia agosto septiembre de 2019
2019 21 
2020 21 tome 7 cordoba enero 2021
2021 tome 14 quedan 7 +4(pendientes)

49*/