import { EmitterTask } from './../../../assets/enums';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalEmitterService {
  emitter: EventEmitter<EmitterTask>;
  constructor() {
    this.emitter = new EventEmitter();
  }

  Emit(value: EmitterTask): void {
    this.emitter.emit(value);
  }
}
