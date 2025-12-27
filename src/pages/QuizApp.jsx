import { useEffect, useState } from 'react';
import shuffleArray from 'shuffle-array';

export default function QuizApp() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [index, setIndex] = useState(0);
    const [questionMarks, setQuestionMarks] = useState(0);
    const [result, setResult] = useState(false);

    // not using anymore
    // const input = useRef([]);

    // to solve the already selected option bug
    const [selectedOption, setSelectedOption] = useState(null) // Track selected answer

    const [options, setOptions] = useState([]);
    useEffect(() => {
        if (data.length > 0) {
            const shuffled = shuffleArray(
                [...data[index].incorrectAnswers, data[index].correctAnswer],
                { copy: true }
            );
            setOptions(shuffled);
            setSelectedOption(null);
        }
    }, [index, data]);

    useEffect(() => {
        const getData = async () => {
            const url = 'https://the-trivia-api.com/v2/questions';
            const options = { method: 'GET', headers: { accept: 'application/json' } };

            try {
                const response = await fetch(url, options);
                if (!response.ok) throw new Error('Failed to fetch users')
                const data = await response.json();
                setData(data)
                console.log(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [])

    // Next Question Handler
    const changeIndex = () => {
        // const selectedOption = input.current.find(item => item && item.checked);
        // console.log(selectedOption.value);

        if (selectedOption === data[index].correctAnswer) {
            console.log(selectedOption.value);
            // Add marks
            setQuestionMarks(prev => prev + 10
                // selectedOption.value === data[index].correctAnswer ? prev + 10 : prev
            );
        }

        // End condition
        if (index === data.length - 1) {
            setResult(true);
            return;
        }

        setIndex(prev => prev + 1);
        setSelectedOption(null)
    };

    // Render skeleton loader or error message if needed
    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <span className="loading loading-infinity loading-xl"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <p className='text-red-500'>{error}</p>
            </div>
        );
    }

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-2xl">

                {/* RESULT SCREEN */}
                {result && (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center space-y-4">
                        <h1 className="text-3xl font-bold text-gray-800">Quiz Completed 🎉</h1>
                        <p className="text-xl text-gray-600">
                            Your Score: <span className="font-semibold text-green-600">{questionMarks}</span>
                        </p>
                    </div>
                )}

                {/* QUESTION CARD */}
                {!result && data && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">

                        {/* Question Header */}
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">
                                Question {index + 1} of {data.length}
                            </p>
                            <h2 className="text-2xl font-semibold text-gray-800">
                                {data[index]?.question?.text}
                            </h2>
                        </div>

                        {/* Options */}
                        <ul className="space-y-3">
                            {options.map((item, i) => (
                                <li key={i}>
                                    <label
                                        htmlFor={`option-${i}`}
                                        className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition
                  ${selectedOption === item
                                                ? 'border-green-500 bg-green-50'
                                                : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            id={`option-${i}`}
                                            name="question"
                                            checked={selectedOption === item}
                                            onChange={() => setSelectedOption(item)}
                                            className="accent-green-600"
                                        />
                                        <span className="text-gray-800">{item}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>

                        {/* Action Button */}
                        <div className="flex justify-end">
                            <button
                                onClick={changeIndex}
                                disabled={!selectedOption}
                                className={`px-6 py-2 rounded-lg font-medium transition
                                ${selectedOption
                                        ? 'bg-green-600 text-white hover:bg-green-700'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {index === data.length - 1 ? 'Finish' : 'Next'}
                            </button>
                        </div>

                    </div>
                )}

            </div>
        </section>

    );
}