const OFF = 0
const ERROR = 2

module.exports = {
  'env': {
    'browser': true,
    'node': true
  },
  'extends': 'standard',
  'plugins': [
    'react'
  ],
  'rules': {
    'comma-dangle': [ERROR, 'always-multiline'],
    'jsx-quotes': [ERROR, 'prefer-double'],
    'keyword-spacing': [ERROR, {after: true, before: true}],
    'no-unused-expressions': ["error", { "allowShortCircuit": true, "allowTernary": true }],
    'no-unused-vars': [ERROR, {args: 'none'}],
    'quotes': [ERROR, 'single', {avoidEscape: true, allowTemplateLiterals: true }],
    'space-before-blocks': ERROR,
    'space-before-function-paren': [ERROR, {anonymous: 'never', named: 'never'}],
    'no-unused-vars': OFF,

    /* React & JSX
     * @see https://raw.githubusercontent.com/facebook/react/master/.eslintrc.js
     */
    'react/jsx-no-undef': ERROR,
    'react/jsx-sort-prop-types': OFF,
    'react/jsx-uses-react': ERROR,
    'react/no-is-mounted': OFF,
    'react/react-in-jsx-scope': ERROR,
    'react/self-closing-comp': ERROR,
    'react/jsx-wrap-multilines': [ERROR, {declaration: false, assignment: false}],
  }
}
