import { ShapeSet } from "@visuallyjs/browser-ui"

const LOGIC_GATE_SHAPES = (terminusSize = 6, showTerminuses = false): ShapeSet => {

    const junctionSize = terminusSize * 1.1
    const junctionInner = terminusSize / 1.3

    const terminusFill = showTerminuses ? "{{outline}}" : "transparent";

    const CENTER_LEFT = "0.5,0.5,-1,0"
    const CENTER_RIGHT = "0.5,0.5,1,0"


    function terminus(x: number, y: number, source: boolean, target: boolean, port: string, anchor: string): string {
        const atts: Record<string, string> = {
            cx: `${x}`,
            cy: `${y}`,
            r: `${terminusSize}`,
            fill: terminusFill,
            stroke: "none",
            "data-vjs-anchor": anchor
        };
        if (source) atts["data-vjs-source"] = "true";
        if (target) atts["data-vjs-target"] = "true";
        if (port) atts["data-vjs-port"] = port;

        const attString = Object.entries(atts).map(([k, v]) => `${k}="${v}"`).join(" ");
        return `<circle ${attString}/>`;
    }

    function inputs(count:number, length?:number):string {

        length = length || 20

        const gap = 120 / (count + 1)
        const i = new Array(count)
        i.fill(0)
        const d = i.map((_v,idx) => `M 0 ${gap * (idx + 1)} L ${length} ${gap * (idx + 1)}`).join(" ") + " M 100 60 L 120 60"
        const terminuses = i.map((_v, idx) => terminus(0, gap*(idx+1), false, true, `in${idx+1}`, CENTER_LEFT)).join("")
        const path = `<path vector-effect="non-scaling-stroke" d="${d}" fill="none" stroke="{{outline}}" stroke-width="2"/>`

        return `${path}${terminuses}${terminus(120, 60, true, false, "out", CENTER_RIGHT)}`
    }

    function aGate(type:string, label:string, description:string, inputCount:number, inputPinLength:number, shape:string) {
        return {
            type,
            label,
            defaultTarget: false,
            group:`${inputCount} inputs`,
            description,
            template: `<svg preserveAspectRatio="none" stroke="{{outline}}" overflow="visible" viewBox="0 0 120 120" width="{{width}}" height="{{height}}">
${inputs(inputCount, inputPinLength)}
${shape}
</svg>`
        }
    }

    function andGate(inputCount:number, type:string) {
        return aGate(type, "AND Gate", "Output is HIGH if all inputs are HIGH", inputCount, 20, `<path vector-effect="non-scaling-stroke" d="M 20 10 L 60 10 C 84 10 100 35 100 60 C 100 85 84 110 60 110 L 20 110 Z" fill="{{fill}}" stroke="{{outline}}"/>`)
    }

    function orGate(inputCount:number, type:string) {
        return aGate(type, "OR Gate", "Output is HIGH if at least one input is HIGH", inputCount, 37, `<path vector-effect="non-scaling-stroke" d="M 20 10 C 36 10 44 35 44 60 C 44 85 36 110 20 110 C 52 110 76 90 100 60 C 76 30 52 10 20 10 Z" fill="{{fill}}" stroke="{{outline}}"/>`)
    }

    function nandGate(inputCount:number, type:string) {
        return aGate(type, "NAND Gate", "Inverse of AND gate", inputCount, 20, `<path vector-effect="non-scaling-stroke" d="M 20 10 L 52 10 C 72 10 84 35 84 60 C 84 85 72 110 52 110 L 20 110 Z" fill="{{fill}}" stroke="{{outline}}"/>
<circle vector-effect="non-scaling-stroke" cx="94" cy="60" r="10" fill="{{fill}}" stroke="{{outline}}"/>`)
    }

    function norGate(inputCount:number, type:string) {
        return aGate(type, "NOR Gate", "Inverse of OR gate", inputCount, 34, `<path vector-effect="non-scaling-stroke" d="M 20 10 C 36 10 44 35 44 60 C 44 85 36 110 20 110 C 44 110 68 90 84 60 C 68 30 44 10 20 10 Z" fill="{{fill}}" stroke="{{outline}}"/>
<circle vector-effect="non-scaling-stroke" cx="94" cy="60" r="10" fill="{{fill}}" stroke="{{outline}}" />`)
    }

    function xorGate(inputCount:number, type:string) {
        return aGate(type, "XOR Gate", "Output is HIGH if inputs are different", inputCount, 27, `<path vector-effect="non-scaling-stroke" d="M 10 10 C 26 10 34 35 34 60 C 34 85 26 110 10 110" fill="none" stroke="currentColor"/>
<path vector-effect="non-scaling-stroke" d="M 20 10 C 36 10 44 35 44 60 C 44 85 36 110 20 110 C 52 110 76 90 100 60 C 76 30 52 10 20 10 Z" fill="{{fill}}" stroke="currentColor"/>`)
    }

    function xnorGate(inputCount:number, type:string) {
        return aGate(type, "XNOR Gate", "Output is HIGH if inputs are the same", inputCount, 27, `<path vector-effect="non-scaling-stroke" d="M 10 10 C 26 10 34 35 34 60 C 34 85 26 110 10 110" fill="none" stroke="{{outline}}"/>
<path vector-effect="non-scaling-stroke" d="M 20 10 C 36 10 44 35 44 60 C 44 85 36 110 20 110 C 44 110 68 90 84 60 C 68 30 44 10 20 10 Z" fill="{{fill}}" stroke="{{outline}}"/>
<circle vector-effect="non-scaling-stroke" cx="94" cy="60" r="10" fill="{{fill}}" stroke="{{outline}}" />`)
    }

    return {
        id: "logic-gates",
        name: "Logic Gates",
        shapes: [
            andGate(2, "and-gate"),
            andGate(3, "and-gate-3"),
            orGate(2, "or-gate"),
            orGate(3, "or-gate-3"),
            {
                type: "not-gate",
                label: "NOT Gate",
                defaultTarget: false,
                group:"Other",
                description: "Output is the inverse of the input",
                template: `<svg preserveAspectRatio="none" overflow="visible" viewBox="0 0 120 120" width="{{width}}" height="{{height}}">
${inputs(1)}
<path vector-effect="non-scaling-stroke" d="M 20 0 L 80 60 L 20 120 Z" fill="{{fill}}" stroke="{{outline}}"/>
<circle vector-effect="non-scaling-stroke" cx="90" cy="60" r="10" fill="none" stroke="{{outline}}"/></svg>`
            },
            nandGate(2, "nand-gate"),
            nandGate(3, "nand-gate-3"),
            norGate(2, "nor-gate"),
            norGate(3, "nor-gate-3"),
            xorGate(2, "xor-gate"),
            xorGate(3, "xor-gate-3"),
            xnorGate(2, "xnor-gate"),
            xnorGate(3, "xnor-gate-3"),
            {
                type: "junction",
                label: "Junction",
                defaultTarget: false,
                group:"Other",
                description: "Wire connection point for signal splitting or merging",
                initialSize: {width: 14, height: 14},
                template: `<svg preserveAspectRatio="none" overflow="visible" viewBox="0 0 ${junctionSize} ${junctionSize}" width="{{width}}" height="{{height}}">
    <circle cx="${junctionSize / 2}" cy="${junctionSize / 2}" r="${junctionSize/2}" fill="{{outline}}" stroke="none" data-vjs-target="true" data-vjs-source="true" data-vjs-anchor="Center"/>
    <circle cx="${junctionSize / 2}" cy="${junctionSize / 2}" r="${junctionInner/2}" fill="{{outline || '#888888'}}" stroke="none"/>
    </svg>`
            }
        ]
    }
}

export default LOGIC_GATE_SHAPES
