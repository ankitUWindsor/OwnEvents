import { EmitterTask } from './../../../assets/enums';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalEmitterService {
  emitter: Subject<EmitterTask>;
  catcher: any;
  constructor() {
    this.emitter = new Subject();
    this.catcher = this.emitter.asObservable();
  }

  Emit(value: EmitterTask): void {
    this.emitter.next(value);
  }
}
