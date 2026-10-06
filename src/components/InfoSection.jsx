export default function InfoSection(props) {
    const { numCorrect, numIncorrect, selectedCategory } = props;
    return (
        <div className="side-margin border-bottom py-1 mb-1">
            <div className="d-flex justify-between">
                <p className="category d-flex align-center justify-center">
                    {selectedCategory}
                </p>
                <div className="d-flex">
                    <div className="d-flex">
                        <p>
                            Correct{" "}
                            <span className="text-correct num-correct-text circle-text">
                                {numCorrect}
                            </span>
                        </p>
                    </div>
                    <div className="d-flex ml-1">
                        <p>
                            Incorrect{" "}
                            <span className="text-incorrect num-incorrect-text circle-text">
                                {numIncorrect}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
