# In The Beginning...
A startpoint framework for bower + gulp prototype projects.


#### prerequisites:
- install homebrew
```shell
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

- install [node.js](https://nodejs.org/en/)
```shell
brew install node
```


#### usage: install
```shell
$ sudo npm install
```

##### extras...
- install gulp-sass (`sudo npm install gulp-sass -g`)


#### usage: setup
+ add `gulpfile.js` into root project directory

_mod `gulpfile.js`_
- line 18 -- change watch directory pwd `app/css/**/*.css`
- line 20 -- change watch directory pwd `*.html`
- line 22 -- add additional directories and working files needed for your project


#### usage: run
```shell
gulp
```
