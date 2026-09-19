import {Component} from '@angular/core';
import {VisuallyJsModule} from '@visuallyjs/browser-ui-angular';
import diagramOptions from './diagram-options';
import {LogicGatesInspector} from "./app-inspector";

@Component({
  selector: 'app-root',
    imports: [VisuallyJsModule, LogicGatesInspector],
  templateUrl: './app.html'
})
export class App {
  options = diagramOptions
}
