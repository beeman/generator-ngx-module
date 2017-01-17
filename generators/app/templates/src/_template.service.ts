import { Injectable } from '@angular/core';

@Injectable()
export class <%= props.project.moduleName %>Service {

  constructor(
  ) {
    console.log('<%= props.project.moduleName %>Service constructor')
  }

  getMessage() {
    return 'Hello from the <%= props.project.moduleName %>Service!'
  }
}
