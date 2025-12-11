import { useState } from "react";

export default function CounterApp() {
    let [count, setCount] = useState(0)

    const handleIncrease = () => {
        setCount(count => count + 1)
    }
    const handleDecrease = () => {
        setCount(count => count ? count - 1 : count)
    }
    const handleReset = () => {
        setCount(0)
    }
    return(
        <>
            <section className="w-full max-w-[1184px] mx-auto pt-10 px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center text-3xl font-extrabold text-gray-900">
                <h1>Counter App</h1>
            </div>
            <div className={`text-center text-5xl font-bold ${count === 0 ? 'text-red-500' : ''}`}>
                {count}
            </div>
            <div className="flex gap-6 justify-center">
                <button onClick={handleIncrease} className="btn btn-primary">Increase <span className="font-bold text-2xl">+</span></button>
                <button onClick={handleReset} className={`btn btn-neutral ${count === 0 ? 'btn-disabled' : ''}`}>Reset</button>
                <button onClick={handleDecrease} className={`btn btn-error ${count === 0 ? 'btn-disabled' : ''}`}>Decrease<span className="font-bold text-2xl">-</span></button>
            </div>
            </section>
        </>
    )
};
