import { Component } from '@angular/core';
import { <%= props.project.moduleName %>Service } from './<%= props.project.name %>.service'

@Component({
  selector: '<%= props.project.name %>',
  template: `
    <h1><%= props.project.moduleName %>Component</h1>
    <h2>{{message}}</h2>
  `
})
export class <%= props.project.moduleName %>Component {

  public message: string;

  constructor(
    private service: <%= props.project.moduleName %>Service
  ) {
    this.message = this.service.getMessage()
  }

}
