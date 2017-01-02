# poc-angular2-webaudio
PoC made with Angular2 in order to navigate through the app by voice commands

## Description
This proof-of-concept is developed on top of the library [artyom.js](https://github.com/asdf) in order to ilustrate the
combination of Angular2 as platform and the navigation through voice commands. The app has been splitted in these sections:
- Home: the main view, in which we can see the minimal navigation bar (to navigate in normal mode with the mouse) and the
    description of the voice commands.
- Section 1: a section/view called "left component".
- Section 2: another section/view called "right component".
- Questions: the view to be shown when the question round is about to start.
- Thanks: the final view to show thanks.

### "left component" or "component left"?
Due to the limitations of the library, it does not recognize the commands with wildcards at the begining, therefore, the
commands to navigate to those sections could be one of the following:
- Component left
- Navigate to left
- Navigate to section left
- Go to component left
- Etc. 

## Installing and executing
In order to test that PoC, please, follow these actions:
- Clone the repo:
```bash
$> git clone https://github.com/semagarcia/poc-angular2-webaudio.git
```
- Install dependencies:
```bash
$> cd poc-angular2-webaudio
$> npm install
```
- Execute it:
```bash
$> npm start
```
- Open the browser: write the url: https://localhost:3000
- Grant permissions:
[GrantPermissions]()
- Test it!: Let's go and start to speak!

## Other purpose ot that PoC
I want to collaborate with the community helping it to make it bigger and bigger. Thus, I've made a PR (pull request) to
artyom.js' author migrating his library to TypeScript and improving it with the benefits of that new approach (types, autocomplete...).
This PoC is the example of use of the new implementation.

## Contributing
If you are interested to contribute with that project, you could perform it via:
- Opening an issue.
- Pull Request.
- Writing me.