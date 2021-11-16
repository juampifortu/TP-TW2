import { HttpClient } from '@angular/common/http';
import { Token } from './Token';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { share, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { 
    this.isLogin();
    this.buildForm();
    
  }

  ngOnInit(): void {
  }
  private isLogin(){
    localStorage.getItem("token") && this.router.navigate(['inicio']);

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
      let res: Observable<Token> =
      this.http.post<Token>("http://localhost:3000/login", value)
      .pipe(share());

      res.subscribe(value => {
        localStorage.setItem("token", value.token);
        return this.router.navigate(['inicio']);

      });
      

    } else {
      this.form.markAllAsTouched();
    }
 
  }

}
