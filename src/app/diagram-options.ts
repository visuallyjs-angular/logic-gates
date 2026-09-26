import {CONNECTOR_TYPE_ORTHOGONAL, DiagramOptions, Node, Group, NodeEventCallbackPayload } from "@visuallyjs/browser-ui"
import LOGIC_GATE_SHAPES from "./logic-gate-shapes";
import {IO_SHAPES} from "./io-shapes";
import {calculators} from "./propagation-calculators";

const options:DiagramOptions = {
    shapes:[LOGIC_GATE_SHAPES(), IO_SHAPES],
    lineCrossings:true,
    edges: {
        layerIndex:0, // we force all edges to the background in this diagram, so they dont overlap our terminuses
        detachable:false,
        connector: {
            type:CONNECTOR_TYPE_ORTHOGONAL,
            options:{
                cornerRadius:5,
                stub:15,
                alwaysRespectStubs:true
            }
        },
        deleteButton:"hover",
        deleteButtonLocation:0.5,
        allowUnattached:false
    },
    cells:{
        rotatable:true,
        rotationStops:4,
        showLabels:true,
        labelPosition:"bottom",
        events: {
            tap: (params:NodeEventCallbackPayload<any>) => {
                if (params.obj.type === "source") {
                    const value = params.obj.data.value == 1 ? "0" : "1"
                    params.model.updateNode(params.obj, {value})
                }
            }
        }
    },
    grid:{
      size:{width:10, height:10}
    },
    lasso:{
        autoArm:true
    },
    zoomToFit:true,
    mediator:{
        canResize:() => false,
        canRotate:(v:Node|Group) => v.group == null && v.type !== "source" && v.type !== "sink" && v.type !== "probe",
        canClone:(v:Node|Group) => v.group == null,
        canDelete:(v:Node|Group) => v.group == null,
        canLink:() => false
    },
    graphPropagation:{
        calculators
    }
}

export default options;
