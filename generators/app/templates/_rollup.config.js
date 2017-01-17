export default {
  entry: 'dist/index.js',
  dest: 'dist/bundles/<%= props.project.name %>.umd.js',
  sourceMap: false,
  format: 'umd',
  moduleName: 'ng.<%= props.project.moduleName %>',
  globals: {
    '@angular/core': 'ng.core'
  }
}
