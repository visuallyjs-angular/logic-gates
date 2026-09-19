import {InspectorComponent, VisuallyJsModule} from '@visuallyjs/browser-ui-angular';
import {Component} from '@angular/core';
import {Node, Group} from "@visuallyjs/browser-ui";

@Component({
    selector:"logic-gates-inspector",
    imports:[VisuallyJsModule],
    template:`
    @if(currentObjectType === "Node") {
      <div class="vjs-inspector-pane">
          
        <div class="vjs-inspector-properties">
            <div class="vjs-inspector-field">
                <label>Label</label>
                <input type="text" vjs-att="label" placeholder="Label"/>
            </div>

			<div style="font-size:12px;color:gray">
                {{currentObj.data['label'] || currentObj.data['type']}}
            </div>
            
        </div>
      </div>
    }
  `
})
export class LogicGatesInspector extends InspectorComponent<Node | Group> {
    asNode(obj: any): Node {
        return obj as Node;
    }
}
