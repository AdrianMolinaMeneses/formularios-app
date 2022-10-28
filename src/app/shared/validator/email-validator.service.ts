import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailValidatorService implements AsyncValidator {
  constructor(private http: HttpClient) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    var params = new HttpParams().set('q', control.value);
    console.log(control.value);
    return this.http
      .get<any>(`${environment.URL_HOST}/usuarios`, { params })
      .pipe(
        delay(3000),
        map((resp) => {
          return resp.length === 0 ? null : { emailTomado: true };
        })
      );
  }
}
