import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

export abstract class CanActivateGuard implements CanActivate {
  canActivate(): Observable<boolean> {
    return this.canActivateMethod();
  }
  abstract canActivateMethod(): Observable<boolean>;
}
