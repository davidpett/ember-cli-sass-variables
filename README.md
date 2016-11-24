[![Build Status](https://travis-ci.org/davidpett/ember-cli-sass-variables.svg?branch=master)](https://travis-ci.org/davidpett/ember-cli-sass-variables)
[![npm version](https://badge.fury.io/js/ember-cli-sass-variables.svg)](https://badge.fury.io/js/ember-cli-sass-variables)
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-sass-variables.svg)](http://emberobserver.com/addons/ember-cli-sass-variables)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
# ember-cli-sass-variables

Access your SASS variables from your Ember app to keep things like style guides up to date.

## Install

Simply run `ember install ember-cli-sass-variables`. If you don't already have `ember-cli-sass` installed, this will do it for you.

### Configure

Once installed, add a `.scss` file that only contains variables such as `app/styles/_variables.scss`.

Configure the addon in your `ember-cli-build.js` file by adding the path to your variables file:
```javascript
var app = new EmberApp(defaults, {
  sassVariables: 'app/styles/_variables.scss'
});
```

## Usage

Once configured you can access the Array containing the variables like so:
```javascript
import Ember from 'ember';
import sassVariables from '../utils/sass-variables';

export default Ember.Component.extend({
  sassVariables
});
```

The Array contains objects with key/value pairs. In your SASS file, you might have:
```scss
$color-red: #FF4136;
$color-blue: #357EDD;
```
And the Equivalent in javascript would be:
```javascript
[
  {
    key: 'colorRed',
    value: '#FF4136'
  }, {
    key: 'colorBlue',
    value: '#357EDD'
  }
]
```

The addon will watch to see if the variables file has changed and automatically update the javascript file with the correct information.
