import { ShapeSet } from "@visuallyjs/browser-ui";

export const IO_SHAPES: ShapeSet = {
    id: "io-shapes",
    name: "I/O",
    shapes: [
        {
            type: "source",
            label: "Source",
            description: "A component that outputs a value.",
            template: `<svg width="{{width}}" height="{{height}}" viewBox="0 0 60 60" overflow="visible">
        <circle cx="30" cy="30" r="28" stroke="{{color}}" stroke-width="2" fill="white" data-vjs-bg="true"/>
        <text x="30" y="30" font-size="20px" text-anchor="middle" dominant-baseline="central" fill="{{color}}">{{value}}</text>
        <circle cx="60" cy="30" r="10" fill="black" data-vjs-source="true"  data-vjs-anchor="0.5,0.5,0,0"/>
    </svg>`,
            properties: [
                {
                    id: "value",
                    label: "Value",
                    type: "string",
                    defaultValue: "0",
                    values:["0", "1"]
                }
            ],
            initialSize:{width:40, height:40}
        },
        {
            type: "sink",
            label: "Sink",
            description: "A component that receives a value.",
            template: `<svg width="{{width}}" height="{{height}}" viewBox="0 0 60 60" overflow="visible">
        <circle cx="30" cy="30" r="28" stroke="{{color}}" stroke-width="2" fill="white" data-vjs-bg="true"/>
        <circle cx="30" cy="30" r="22" stroke="{{color}}" stroke-width="2" fill="none"/>
        <text x="30" y="30" font-size="20px" text-anchor="middle" dominant-baseline="central" fill="{{color}}">{{value}}</text>
        <circle cx="0" cy="30" r="10" fill="black" data-vjs-target="true"  data-vjs-anchor="0.5,0.5,0,0"/>
    </svg>`,
            properties: [
                {
                    id: "value",
                    label: "Value",
                    type: "string",
                    defaultValue: "0",
                    readOnly: true
                }
            ],
            initialSize:{width:40, height:40}
        },
        {
            type: "probe",
            label: "Probe",
            description: "A component that displays a value as it passes through.",
            template: `<svg width="{{width}}" height="{{height}}" viewBox="0 0 60 60" overflow="visible">
        <circle cx="30" cy="30" r="28" stroke="{{color}}" stroke-width="2" fill="white" data-vjs-bg="true"/>
        <text x="30" y="30" font-size="20px" text-anchor="middle" dominant-baseline="central" fill="{{color}}">{{value}}</text>
        <circle cx="0" cy="30" r="10" fill="black" data-vjs-target="true"  data-vjs-anchor="0.5,0.5,0,0"/>
        <circle cx="60" cy="30" r="10" fill="black" data-vjs-source="true"  data-vjs-anchor="0.5,0.5,0,0"/>
    </svg>`,
            properties: [
                {
                    id: "value",
                    label: "Value",
                    type: "string",
                    defaultValue: "0",
                    readOnly: true
                }
            ],
            initialSize:{width:40, height:40}
        }
    ]
};
