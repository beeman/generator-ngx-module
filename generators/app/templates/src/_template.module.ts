import { NgModule } from '@angular/core';

import { <%= props.project.moduleName %>Service } from './<%= props.project.name %>.service';
import { <%= props.project.moduleName %>Component } from './<%= props.project.name %>.component';

export function asyncLocalStorageFactory() {
  return new <%= props.project.moduleName %>Service();
}

@NgModule({
  declarations: [
    <%= props.project.moduleName %>Component,
  ],
  exports: [
    <%= props.project.moduleName %>Component,
  ],
  providers: [
    {
      provide: <%= props.project.moduleName %>Service,
      useFactory: asyncLocalStorageFactory
    }
  ]
})
export class <%= props.project.moduleName %>Module {
}
