import {Calculator, DEFAULT_TERMINAL, EvaluationContext, NodeEvaluation, Node} from "@visuallyjs/browser-ui";

export type BooleanValue = "0"|"1"
type BooleanState = {
    inputs?: Array<BooleanValue | undefined>
    output?: BooleanValue
    value?: BooleanValue
}

function getInputs(node:Node, context:EvaluationContext<BooleanValue>):Array<BooleanValue|undefined> {
    const inputCount = node.data.inputCount
    const values:Array<BooleanValue|undefined> = []
    for (let i = 0; i < inputCount; i++) {
        values.push(context.input(`in${i+1}`))
    }
    return values
}

function or(values:Array<BooleanValue|undefined>):BooleanValue {
    return values.find(v => v === "1") != null ? "1" : "0"
}

function and(values:Array<BooleanValue|undefined>):BooleanValue {
    return values.every(v => v === "1")  ? "1" : "0"
}

function xor(values:Array<BooleanValue|undefined>):BooleanValue {
    return values.filter(v => v === "1").length === 1 ? "1" : "0"
}

function not(v:BooleanValue):BooleanValue {
    return v === "1" ? "0" : "1"
}

function outputEvaluation(output: BooleanValue, inputs?: Array<BooleanValue | undefined>):NodeEvaluation<BooleanValue, BooleanState> {
    return {
        outputs: {
            out: output
        },
        state: {
            inputs,
            output
        }
    }
}

const junctionOrProbe = (_node:Node, context:EvaluationContext<BooleanValue>):NodeEvaluation<BooleanValue, BooleanState> => {
    const value = context.input(DEFAULT_TERMINAL)
    return {
        outputs: {
            [DEFAULT_TERMINAL]: value
        },
        state: {
            value
        }
    }
}

export const calculators: Record<string, Calculator<BooleanValue, BooleanState>> = {
    "source": (node: Node) => {
        const value = node.data.value as BooleanValue
        return {
            outputs: {
                [DEFAULT_TERMINAL]: value
            },
            state: {
                value
            }
        }
    },
    "junction":junctionOrProbe,
    "probe":junctionOrProbe,
    "or-gate":(node:Node, context:EvaluationContext<BooleanValue>) => {
        const inputs = getInputs(node, context)
        const output = or(inputs)
        return outputEvaluation(output, inputs)
    },
    "or-gate-3":(node:Node, context:EvaluationContext<BooleanValue>) => {
        const inputs = getInputs(node, context)
        const output = or(inputs)
        return outputEvaluation(output, inputs)
    },
    "and-gate":(node:Node, context:EvaluationContext<BooleanValue>) => {
        const inputs = getInputs(node, context)
        const output = and(inputs)
        return outputEvaluation(output, inputs)
    },
    "and-gate-3":(node:Node, context:EvaluationContext<BooleanValue>) => {
        const inputs = getInputs(node, context)
        const output = and(inputs)
        return outputEvaluation(output, inputs)
    },
    "not-gate":(_node:Node, context:EvaluationContext<BooleanValue>) => {
        const v1 = context.input("in1")
        const output = v1 === "1" ? "0" : "1"
        return outputEvaluation(output, [v1])
    },
    "xor-gate":(node:Node, context:EvaluationContext<BooleanValue>) => {
        const inputs = getInputs(node, context)
        const output = xor(inputs)
        return outputEvaluation(output, inputs)
    },
    "xor-gate-3":(node:Node, context:EvaluationContext<BooleanValue>) => {
        const inputs = getInputs(node, context)
        const output = xor(inputs)
        return outputEvaluation(output, inputs)
    },
    "nor-gate":(node:Node, context:EvaluationContext<BooleanValue>) => {
        const inputs = getInputs(node, context)
        const output = not(or(inputs))
        return outputEvaluation(output, inputs)
    },
    "nor-gate-3":(node:Node, context:EvaluationContext<BooleanValue>) => {
        const inputs = getInputs(node, context)
        const output = not(or(inputs))
        return outputEvaluation(output, inputs)
    },
    "nand-gate":(node:Node, context:EvaluationContext<BooleanValue>) => {
        const inputs = getInputs(node, context)
        const output = not(and(inputs))
        return outputEvaluation(output, inputs)
    },
    "nand-gate-3":(node:Node, context:EvaluationContext<BooleanValue>) => {
        const inputs = getInputs(node, context)
        const output = not(and(inputs))
        return outputEvaluation(output, inputs)
    },
    "xnor-gate":(node:Node, context:EvaluationContext<BooleanValue>) => {
        const inputs = getInputs(node, context)
        const output = not(xor(inputs))
        return outputEvaluation(output, inputs)
    },
    "xnor-gate-3":(node:Node, context:EvaluationContext<BooleanValue>) => {
        const inputs = getInputs(node, context)
        const output = not(xor(inputs))
        return outputEvaluation(output, inputs)
    }

}
