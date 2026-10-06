import { useState, useEffect, useRef } from "react";
import "./App.css";
import Nav from "./components/Nav";
import InfoSection from "./components/InfoSection";
import Problem from "./components/Problem";
import {
    MultiplicationProblemGenerator,
    ProblemGeneratorFactory,
} from "./components/problemGenerator";

const NUM_PROBLEMS = 20;
const problemFactory = new ProblemGeneratorFactory();

function App() {
    const bottomRef = useRef(null);
    const nextProblemIdRef = useRef(null);
    const problemGeneratorRef = useRef(null);

    const categories = [
        "Multiplication",
        "Addition",
        "Subtraction",
        "Division",
    ];
    const [selectedCategory, setSelectedCategory] = useState("Multiplication");
    const [numCorrect, setNumCorrect] = useState(0);
    const [numIncorrect, setNumIncorrect] = useState(0);

    // used to give unique id to problems when they get generated
    const [numCreated, setNumCreated] = useState(0);

    const [problemGenerator, setProblemGenerator] = useState(
        new MultiplicationProblemGenerator(),
    );
    const [problems, setProblems] = useState([]);

    const gradeProblem = (answer, id) => {
        const problem = problems.find((prob) => id == prob.id);
        // console.log("grading: " + JSON.stringify(problem));
        if (answer == problem.answer) {
            setNumCorrect((num) => num + 1);
            updateProblems(id, true);
        } else {
            setNumIncorrect((num) => num + 1);
            updateProblems(id, false);
        }
    };

    const updateProblems = (id, wasCorrect) => {
        const newProblems = problems.map((problem, i) => {
            if (problem.id === id) {
                // console.log("found problem: " + id);
                return {
                    ...problem,
                    correct: wasCorrect,
                    graded: true,
                };
            } else {
                return problem;
            }
        });

        setProblems(newProblems);
    };

    const handleCategoryChange = (newCategory) => {
        setSelectedCategory(newCategory);
        setProblemGenerator(problemFactory.createFactory(newCategory));

        console.log("changed category");
        nextProblemIdRef.current = 0;
        setNumCreated(0);
    };

    const loadProblems = (append = false) => {
        const generator = problemGeneratorRef.current ?? problemGenerator;
        const startId = nextProblemIdRef.current;
        const generatedProblems = generator.generate(NUM_PROBLEMS, startId);

        nextProblemIdRef.current += NUM_PROBLEMS;
        setNumCreated(nextProblemIdRef.current);

        if (append) {
            setProblems((prev) => [...prev, ...generatedProblems]);
        } else {
            setProblems(generatedProblems);
        }
    };

    // update generator ref when it changes
    useEffect(() => {
        problemGeneratorRef.current = problemGenerator;
    }, [problemGenerator]);

    // update problems when generator changes
    useEffect(() => {
        loadProblems(false);
        // console.log(
        //     "calling probgen useeffect: " + problemGenerator.constructor.name,
        // );
    }, [problemGenerator]);

    // listen for scroll to bottom
    useEffect(() => {
        let isFirstObservation = true;

        const observer = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];
                if (isFirstObservation) {
                    isFirstObservation = false;
                    return;
                }

                loadProblems(true);
            },
            {
                threshold: 1.0,
            },
        );
        // console.log(
        //     "calling scroll useeffect: " + problemGenerator.constructor.name,
        // );

        // if bottomRef exists, have the observer listen for it?
        if (bottomRef.current) {
            observer.observe(bottomRef.current);
        }

        // return cleanup function (unobserve the ref)
        return () => {
            if (bottomRef.current) {
                observer.unobserve(bottomRef.current);
            }
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div className="content">
                <Nav
                    categories={categories}
                    selectedCategory={selectedCategory}
                    handleCategoryChange={handleCategoryChange}
                />
                <InfoSection
                    numCorrect={numCorrect}
                    numIncorrect={numIncorrect}
                    selectedCategory={selectedCategory}
                />
                <section className="side-margin">
                    {problems.map((problem, i) => {
                        return (
                            <Problem
                                key={problem.id}
                                problem={problem}
                                id={problem.id}
                                gradeProblem={gradeProblem}
                            />
                        );
                    })}
                </section>
            </div>
            <div ref={bottomRef} className="bottom-ref"></div>
        </>
    );
}

export default App;
