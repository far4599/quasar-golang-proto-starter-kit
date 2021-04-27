const { complete } = require('./utils')
const escape = val => JSON.stringify(val).slice(1, -1)

module.exports = {
  prompts: {
    name: {
      type: 'string',
      message: 'Project name (internal usage for dev)',
      validate: val => val && val.length > 0
    },

    productName: {
      type: 'string',
      message: 'Project product name (must start with letter if building mobile apps)',
      default: 'Quasar App',
      validate: val => val && val.length > 0,
      transformer: escape
    },

    description: {
      type: 'string',
      message: 'Project description',
      default: 'A Quasar Framework app',
      transformer: escape
    },

    author: {
      type: 'string',
      message: 'Author'
    },

    css: {
      type: 'list',
      message: 'Pick your favorite CSS preprocessor: (can be changed later)',
      default: 'scss',
      choices: [
        {
          name: 'Sass with SCSS syntax (recommended)',
          value: 'scss',
          short: 'SCSS'
        },
        {
          name: 'Sass with indented syntax (recommended)',
          value: 'sass',
          short: 'Sass'
        },
        {
          name: 'Stylus (deprecated)',
          value: 'stylus'
        },
        {
          name: 'None (the others will still be available)',
          value: 'none',
          short: 'None'
        }
      ]
    },

    importStrategy: {
      type: 'list',
      message: 'Pick a Quasar components & directives import strategy: (can be changed later)',
      choices: [
        {
          name: '* Auto-import in-use Quasar components & directives\n    - also treeshakes Quasar; minimum bundle size',
          value: 'auto',
          short: 'Auto import',
          checked: true
        },
        {
          name: '* Import everything from Quasar\n    - not treeshaking Quasar; biggest bundle size',
          value: 'all',
          short: 'Import everything'
        }
      ]
    },

    preset: {
      type: 'checkbox',
      message: 'Check the features needed for your project:',
      choices: [
        {
          name: 'ESLint (recommended)',
          value: 'lint',
          checked: true
        },
        {
          name: 'Axios',
          value: 'axios'
        },
        {
          name: 'Vue-i18n',
          value: 'i18n'
        },
        {
          name: 'IE11 support',
          value: 'ie'
        }
      ]
    },

    lintConfig: {
      when: 'preset.lint',
      type: 'list',
      message: 'Pick an ESLint preset:',
      choices: [
        {
          name: 'Prettier (https://github.com/prettier/prettier)',
          value: 'prettier',
          short: 'Prettier'
        },
        {
          name: 'Standard (https://github.com/standard/standard)',
          value: 'standard',
          short: 'Standard',
        },
        {
          name: 'Airbnb (https://github.com/airbnb/javascript)',
          value: 'airbnb',
          short: 'Airbnb',
        }
      ]
    },

    autoInstall: {
      type: 'list',
      message:
        'Continue to install project dependencies after the project has been created? (recommended)',
      choices: [
        {
          name: 'Yes, use Yarn (recommended)',
          value: 'yarn',
          short: 'yarn',
        },
        {
          name: 'Yes, use NPM',
          value: 'npm',
          short: 'NPM',
        },
        {
          name: 'No, I will handle that myself',
          value: false,
          short: 'no',
        }
      ]
    }
  },

  filters: {
    // ESlint files
    '.eslintignore': 'preset.lint',
    '.eslintrc.js': 'preset.lint',

    // Presets files when not using TypeScript
    'src/boot/axios.js': 'preset.axios',
    'src/boot/i18n.js': 'preset.i18n',
    'src/i18n/**/*.js': 'preset.i18n',
    'src/store/**/*.js': 'preset.vuex',

    // CSS preprocessors
    '.stylintrc': `preset.lint && css === 'stylus'`,
    'src/css/*.styl': `css === 'stylus'`,
    'src/css/*.scss': `css === 'scss'`,
    'src/css/*.sass': `css === 'sass'`,
    'src/css/app.css': `css === 'none'`,
  },

  complete
};
