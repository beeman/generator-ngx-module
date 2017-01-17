'use strict';
const path = require('path');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = Generator.extend({

  initializing() {
    this.props = {};
  },

  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('ngx-module') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Name of the project (kebab-case)',
        default: _.kebabCase(path.basename(process.cwd())),
        store: true,
      },
      {
        type: 'input',
        name: 'repoUrl',
        message: 'Git repository url',
        default: 'https://github.com/username/repo',
        store: true
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Your full name:',
        validate: function (input) {
          if (/.+/.test(input)) {
            return true;
          }
          return 'Please enter your full name';
        },
        default: this.user.git.name
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Your email address:',
        validate: function (input) {
          if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input)) {
            return true;
          }
          return 'Please enter a valid email address';
        },
        default: this.user.git.email
      },
    ];

    return this.prompt(prompts)
      .then((props) => {
        this.props = {
          author: {
            name: props.authorName,
            email: props.authorEmail,
          },
          project: {
            name: props.projectName,
            description: _.startCase(props.projectName) + " Angular Module",
            moduleName: _.startCase(props.projectName).replace(/ /g, ''),
            repoUrl: props.repoUrl,
          }
        }
      })
  },

  writing: function () {

    console.log('this.props')
    console.log(JSON.stringify(this.props, null, 2))

    // ROOT FILES
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copyTpl(
      this.templatePath('_tsconfig.json'),
      this.destinationPath('tsconfig.json'), {
        props: this.props
      });

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'), {
        props: this.props
      });

    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'), {
        props: this.props
      });

    this.fs.copyTpl(
      this.templatePath('_LICENSE'),
      this.destinationPath('LICENSE'), {
        props: this.props
      });

    this.fs.copyTpl(
      this.templatePath('_index.ts'),
      this.destinationPath('index.ts'), {
        props: this.props
      });

    this.fs.copyTpl(
      this.templatePath('_rollup.config.js'),
      this.destinationPath('rollup.config.js'), {
        props: this.props
      });

    // DIST FILES
    this.fs.copyTpl(
      this.templatePath('dist/_package.json'),
      this.destinationPath('dist/package.json'), {
        props: this.props
      });

    // SRC FILES
    this.fs.copyTpl(
      this.templatePath('src/_index.ts'),
      this.destinationPath('src/index.ts'), {
        props: this.props
      });

    this.fs.copyTpl(
      this.templatePath('src/_template.component.ts'),
      this.destinationPath('src/' + this.props.project.name + '.component.ts'), {
        props: this.props
      });

    this.fs.copyTpl(
      this.templatePath('src/_template.module.ts'),
      this.destinationPath('src/' + this.props.project.name + '.module.ts'), {
        props: this.props
      });

    this.fs.copyTpl(
      this.templatePath('src/_template.service.ts'),
      this.destinationPath('src/' + this.props.project.name + '.service.ts'), {
        props: this.props
      });

  },

  install: function () {
    this.installDependencies({
      bower: false
    });
  }
});
