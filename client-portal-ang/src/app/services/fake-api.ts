import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeApiService {

  simulateApiCall<T>(data: T, delayMs: number = 200): Observable<T> {
    return of(data).pipe(delay(delayMs));
  }
}
