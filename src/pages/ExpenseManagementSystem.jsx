import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import Stat from "../components/Stat";

export default function ExpenseManagementSystem() {
    // Get Current Date
    const getTodayDate = () => {
        return new Date().toISOString().split('T')[0];
    };

    // data states
    const [expenseData, setExpenseData] = useState({
        name: '',
        amount: '',
        category: '',
        date: getTodayDate(),
    });


    // Does not save expense data in local storage
    // const [expense, setExpense] = useState([])

    // this code saves the expense data in local storage,
    const [expense, setExpense] = useState(() => {
        const savedExpenses = localStorage.getItem("expenses_data");
        return savedExpenses ? JSON.parse(savedExpenses) : [];
    });
    const [total, setTotal] = useState(0)
    const [editIndex, setEditIndex] = useState(null);
    // const [latestAmount, setLatestAmount] = useState(0)
    const [currentMonthExpenses, setCurrentMonthExpenses] = useState(0)
    const [currentDayExpenses, setCurrentDayExpenses] = useState(0)
    const [filterType, setFilterType] = useState('');
    const [filterValue, setFilterValue] = useState('');


    const categories = [
        "Food",
        "Petrol",
        "Haircut",
        "Loan",
        "Health",
        "Travel",
        "Utilites",
        "Shopping",
        "Transportation",
        "Entertainment",
        "Other Expenses",
    ];

    // * handleChange
    const handleChange = (event) => {
        const { name, value } = event.target;
        // setExpenseData({ ...expenseData, [name]: value })
        setExpenseData(prev => ({ ...prev, [name]: value }));
    }

    // * handleSubmit
    const handleSubmit = (event) => {
        event.preventDefault()

        if (
            !expenseData.name.trim() ||
            !expenseData.amount ||
            !expenseData.category.trim() ||
            !expenseData.date.trim()
        ) {
            toast.error('All fields are required!')
            return;
        }

        // if (expenseData.amount <= 0) {
        //     toast.error("Amount must not be zero");
        //     return;
        // }

        const numAmount = parseFloat(expenseData.amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        // if (editIndex === null) {
        //     // add new expense
        //     setExpense([...expense, expenseData]);
        //     toast.success('Todo created successfuly')
        // } else {
        //     const updateExpense = [...expense];
        //     updateExpense[editIndex] = expenseData;

        //     // Update existing todo
        //     setExpense(updateExpense);
        //     toast.success('Todo edited successfuly')
        //     // Reset edit mode
        //     setEditIndex(null);
        // }

        // const newExpense = { ...expenseData, amount: parseFloat(expenseData.amount) };
        const newExpense = { ...expenseData, amount: numAmount };

        if (editIndex === null) {
            // Add new expense
            setExpense([...expense, newExpense]);
            toast.success('Expense added successfully');
        } else {
            // Update existing expense
            const updatedExpenses = [...expense];
            updatedExpenses[editIndex] = newExpense;
            setExpense(updatedExpenses);
            setEditIndex(null);
            toast.success('Expense updated successfully');
        }

        // reset form
        setExpenseData({
            name: '',
            amount: '',
            category: '',
            date: getTodayDate(),
        });
    }

    // * handleEdit
    const handleEdit = (index) => {
        setEditIndex(index);
        setExpenseData(expense[index]); // Populate form fields with the selected todo item
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // * handleDelete
    // const handleDelete = (index) => {
    //     if (editIndex === null) {
    //         toast((t) => (
    //             <span>
    //                 Are you sure you want to <b>Delete</b>?
    //                 <button onClick={() => toast.success(t.id)}>
    //                     Yes
    //                 </button>
    //             </span>
    //         ));
    //         const updatedTodo = expense.filter((_, i) => i !== index); // Remove todo without mutating state
    //         setExpense(updatedTodo);
    //         toast.success('Expense deleted successfully!')
    //         return
    //     }
    //     toast.error('Deletion is not possible while in edit mode.')
    // }

    const handleDelete = (index) => {
        if (editIndex === null) {
            toast((t) => (
                <span className="flex items-center gap-2">
                    <span>
                        Are you sure you want to <b>Delete</b>?
                    </span>
                    <button
                        onClick={() => {
                            const updatedTodo = expense.filter((_, i) => i !== index); // Remove expense without mutating state
                            setExpense(updatedTodo);
                            toast.success('Expense deleted successfully!');
                            toast.dismiss(t.id); // Close the confirmation toast
                        }}
                        className="btn btn-success"
                    >
                        Yes
                    </button>
                </span>
            ));
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            toast.error('Deletion is not possible while in edit mode.');
        }
    };

    // * handleDeleteAll
    const handleDeleteAll = () => {
        if (editIndex === null) {
            toast((t) => (
                <span className="flex items-center gap-2">
                    <span>
                        Are you sure you want to <b>Delete</b> all expenses?
                    </span>
                    <button
                        onClick={() => {
                            setExpense([]);
                            toast.success('All expense deleted successfully!');
                            toast.dismiss(t.id); // Close the confirmation toast
                        }}
                        className="btn btn-success"
                    >
                        Yes
                    </button>
                </span>
            ));
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            toast.error('Deletion is not possible while in edit mode.');
        }
    };


    useEffect(() => {
        localStorage.setItem("expenses_data", JSON.stringify(expense));

        const totalAmount = expense
            .reduce((acc, item) => acc + item.amount, 0);
        setTotal(totalAmount);

        const currentMonth = new Date().getMonth()
        const currentDay = new Date().getDate()
        const currentYear = new Date().getFullYear()

        const monthTotal = expense.filter(item => {
            const d = new Date(item.date)
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear
        }).reduce((acc, item) => acc + item.amount, 0)

        const dayTotal = expense.filter(item => {
            const d = new Date(item.date)
            return d.getDate() === currentDay && d.getMonth() === currentMonth && d.getFullYear() === currentYear
        }).reduce((acc, item) => acc + item.amount, 0)

        setCurrentMonthExpenses(monthTotal)
        setCurrentDayExpenses(dayTotal)

        // get latest expense
        // const latestExpense = expense
        // .filter(item => item.date === getTodayDate())
        // .sort((a, b) => new Date(b.date) - new Date(a.date))[0]; // Sort by date, descending
        // setLatestAmount(latestExpense)

        // calculate current month expense
        // const currentMonthExpenses = expense.filter(item => new Date(item.date).getMonth() === new Date().getMonth()).reduce((acc, item) => acc + item.amount, 0);
        // setCurrentMonthExpenses(currentMonthExpenses)
    }, [expense]);

    // filter
    const filteredExpenses = expense.map((item, originalIndex) => ({ ...item, originalIndex }))
        .filter(item => {
            if (!filterType || !filterValue) return true;
            return item[filterType] === filterValue;
        });

    return (
        <section className="max-w-[1184px] mx-auto pt-12 px-6">
            <div className="text-center text-4xl font-extrabold text-gray-900 mb-8">
                <h1>Expense Management System</h1>
            </div>

            {/* Expense Input Form Start */}
            <div className="bg-white shadow-xl rounded-xl p-8 space-y-6 mb-10">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Name and Amount Input */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="name"
                                className="text-lg font-medium text-gray-700"
                            >
                                Expense Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={expenseData.name}
                                // onChange={(e) => setExpenseData({ ...expenseData, name: e.target.value })}
                                onChange={handleChange}
                                placeholder="Enter expense name"
                                className="input p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                maxLength={100}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="amount"
                                className="text-lg font-medium text-gray-700"
                            >
                                Expense Amount
                            </label>
                            <input
                                type="text"
                                id="amount"
                                name="amount"
                                value={expenseData.amount}
                                onChange={handleChange}
                                placeholder="Enter expense amount"
                                className="input p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                maxLength={100}
                            />
                        </div>
                    </div>

                    {/* Date and Category Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="date"
                                className="text-lg font-medium text-gray-700"
                            >
                                Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={expenseData.date}
                                onChange={handleChange}
                                className="input p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="category"
                                className="text-lg font-medium text-gray-700"
                            >
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={expenseData.category}
                                onChange={handleChange}
                                className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="" disabled>Select a category</option>
                                {
                                    categories.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-6">
                        <input
                            type="submit"
                            // Dynamically change button text
                            value={editIndex !== null ? "Update Expense" : "Add Expense"}
                            // Disable if fields are empty
                            // disabled={!todoData.title.trim() || !todoData.description.trim()}  
                            className="btn btn-primary w-full text-[1.1rem]" />
                    </div>
                </form>
            </div>
            {/* Expense Input Form End */}

            {/* Stat Start */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Stat name={'Total Expenses'} value={total} />
                <Stat name={"Today's Expenses"} value={currentDayExpenses} />
                <Stat name={'Current Month Expenses'} value={currentMonthExpenses} />
                {/* <Stat name={'Latest Expense'} value={latestAmount}/> */}
            </div>
            {/* Stat End */}

            {/* Filter Controls Start */}
            <div className="flex flex-wrap items-center justify-end gap-3 mb-4 bg-gray-50 p-4 rounded-lg">
                <span className="font-bold">Filter:</span>
                <select value={filterType} onChange={(e) => { setFilterType(e.target.value); setFilterValue(''); }} className="p-2 border rounded">
                    <option value="">No Filter</option>
                    <option value="date">By Date</option>
                    <option value="category">By Category</option>
                </select>

                {filterType === 'date' && <input type="date" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} className="p-2 border rounded" />}
                {filterType === 'category' && (
                    <select value={filterValue} onChange={(e) => setFilterValue(e.target.value)} className="p-2 border rounded">
                        <option value="">All Categories</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                )}
                {filterValue && <button onClick={() => { setFilterType(''); setFilterValue('') }} className="text-sm text-red-500">Clear</button>}
            </div>
            {/* Filter Controls End */}

            {/* Expense List  Start*/}
            {expense && expense.length > 0 ? (
                <div className="overflow-x-auto mt-5 flex flex-col gap-4">

                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr className="bg-gray-300">
                                <th className="p-3"></th>
                                <th className="p-3">Expense Name</th>
                                <th className="p-3">Amount</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Actions</th>
                                <td className="px-0">
                                    <button
                                        type="button"
                                        className="font-bold text-red-500 hover:text-red-700 cursor-pointer transition"
                                        onClick={handleDeleteAll}>
                                        Delete All
                                    </button>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredExpenses.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <th className="p-3">{index + 1}</th>
                                        <td className="p-3">{item.name}</td>
                                        <td className="p-3">Rs. {item.amount}</td>
                                        <td className="p-3">{item.date}</td>
                                        <td className="p-3">{item.category}</td>
                                        <td className="p-3 flex justify-between">
                                            <span className="flex gap-2">
                                                <button
                                                    type="button"
                                                    className="text-lg tooltip"
                                                    data-tip="Edit"
                                                    onClick={() => handleEdit(index)}>
                                                    <FiEdit3 className="text-green-500 hover:text-green-600 cursor-pointer transition" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="text-lg tooltip"
                                                    data-tip="Delete"
                                                    onClick={() => handleDelete(index)}>
                                                    <AiOutlineDelete className="text-red-500 hover:text-red-600 cursor-pointer transition" />
                                                </button>
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex justify-center items-center mt-5">
                    <span >No Expenses Found</span>
                </div>
            )
            }
            {/* Expense List  End*/}

        </section>
    );
}
