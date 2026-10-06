import { v4 as uuidv4 } from "uuid";

export class ProblemGeneratorFactory {
    createFactory(category) {
        if (category === "Multiplication") {
            return new MultiplicationProblemGenerator();
        } else if (category === "Addition") {
            return new AdditionProblemGenerator();
        } else if (category === "Subtraction") {
            return new SubtractionProblemGenerator();
        } else if (category === "Division") {
            return new DivisionProblemGenerator();
        }
    }
}

class ProblemGenerator {
    generate(numProblems, startID) {
        throw new Error("Method 'problemGenerator()' must be implemented.");
    }

    randomRange(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export class AdditionProblemGenerator extends ProblemGenerator {
    generate(numProblems, startID) {
        const problems = [...Array(numProblems)].map((_, i) => {
            const op_0 = this.randomRange(0, 100);
            const op_1 = this.randomRange(0, 100);

            return {
                id: uuidv4(),
                type: "Addition",
                operands: [op_0, op_1],
                answer: op_0 + op_1,
                operator: "+",
                graded: false,
                correct: false,
            };
        });

        return problems;
    }
}

export class MultiplicationProblemGenerator extends ProblemGenerator {
    generate(numProblems, startID) {
        // this range could be a paramater to constructor?
        const problems = [...Array(numProblems)].map((_, i) => {
            const op_0 = this.randomRange(0, 9);
            const op_1 = this.randomRange(0, 9);

            return {
                id: uuidv4(),
                type: "Multiplication",
                operands: [op_0, op_1],
                answer: op_0 * op_1,
                operator: "*",
                graded: false,
                correct: false,
            };
        });

        return problems;
    }
}

export class SubtractionProblemGenerator extends ProblemGenerator {
    generate(numProblems, startID) {
        const problems = [...Array(numProblems)].map((_, i) => {
            const op_0 = this.randomRange(0, 100);
            const op_1 = this.randomRange(0, 100);

            return {
                id: uuidv4(),
                type: "Subtraction",
                operands: [op_0, op_1],
                answer: op_0 - op_1,
                operator: "-",
                graded: false,
                correct: false,
            };
        });

        return problems;
    }
}

export class DivisionProblemGenerator extends ProblemGenerator {
    generate(numProblems, startID) {
        const problems = [...Array(numProblems)].map((_, i) => {
            // need to make sure result is an integer
            const op_0 = this.randomRange(1, 10);
            const op_1 = this.randomRange(1, 10);

            // looks like: op_0*op_1/op_1 = op_0
            return {
                id: uuidv4(),
                type: "Division",
                operands: [op_0 * op_1, op_1],
                answer: op_0,
                operator: "/",
                graded: false,
                correct: false,
            };
        });

        return problems;
    }
}
