import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Artyom } from './artyom';

@Component({
  selector: 'my-app',
  template: `
    <p><h1>Hello AngularVoice!</h1></p><br />
    <a [routerLink]="['/']">Home</a> |
    <a [routerLink]="['/comp-left']">Left component</a> |
    <a [routerLink]="['/comp-right']">Right component</a> |
    <a [routerLink]="['/questions']">Questions?</a> |
    <a [routerLink]="['/thanks']">Thanks</a>
    <br />
    <router-outlet></router-outlet>
  `
})
export class AppComponent {

  constructor(private router: Router) {
    let artyom = Artyom.getInstance();

    // Go to home
    artyom.addCommands({
      indexes: ["Go home"], 
      action: (i) => {
        artyom.say("Going home");
        this.router.navigate(['/']);
      }
    });

    // Navigate to component
    artyom.addCommands({
      smart: true,
      indexes: ["Component *"], 
      action: (i, wildcard) => {
        console.log('Component ==> ', wildcard);
        switch(wildcard) {
          case "left":
            artyom.say("I'll go to left component");
            this.router.navigate(['/comp-left']);
            break;
          case "right":
            artyom.say("I'll go to right component");
            this.router.navigate(['/comp-right']);
            break;
        }
      }
    });

    // Questions
    artyom.addCommands({
      indexes: ["Questions"], 
      action: (i) => {
        artyom.say("Any question?");
        this.router.navigate(['/questions']);
      }
    });

    // Thanks
    artyom.addCommands({
      indexes: ["Thanks"], 
      action: (i) => {
        artyom.say("A lot of thanks!");
        this.router.navigate(['/thanks']);
      }
    });

    artyom.initialize({
     lang: 'en-GB',  // More languages are documented in the library (default: en-GB)
     continuous: true,  //if you have https connection, you can activate continuous mode
     debug: true,  //Show everything in the console
     listen: true  // Start listening when this function is triggered
   });
  }

}
