import { useState } from "react";
export default function Problem(props) {
    const { problem, id, gradeProblem } = props;
    const [answer, setAnswer] = useState("");

    const handleSubmit = () => {
        gradeProblem(parseInt(answer), id);
    };

    const getBackgroundClass = () => {
        let problemClass = "problem ";

        if (!problem.graded) {
            return (problemClass += "problem-ungraded");
        } else if (problem.correct) {
            return (problemClass += "problem-correct");
        } else {
            return (problemClass += "problem-incorrect");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={getBackgroundClass()}>
            {/* <p>{problem.id}</p>
            {problem.graded && <p>true</p>}
            {problem.correct && <p>true</p>} */}
            {problem.graded &&
                (problem.correct ? (
                    <p className="grade-text text-correct">Correct!</p>
                ) : (
                    <p className="grade-text text-incorrect">
                        Incorrect. Answer is {problem.answer}
                    </p>
                ))}
            <div className="d-flex justify-center align-center">
                <p className="mx-half">{`${problem.operands[0]} ${problem.operator} ${problem.operands[1]} = `}</p>
                <input
                    disabled={problem.graded}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="problem-submit"
                    type="text"
                />
                <button
                    disabled={problem.graded}
                    onClick={handleSubmit}
                    className="submit-btn mx-half"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}
