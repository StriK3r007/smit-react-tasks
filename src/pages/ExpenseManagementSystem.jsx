import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";

export default function ExpenseManagementSystem() {
    // Get Current Date
    const getTodayDate = () => {
        return new Date().toISOString().split('T')[0];
    };

    const [expenseData, setExpenseData] = useState({
        name: '',
        amount: 0,
        category: '',
        date: getTodayDate(),
    });
    const [total, setTotal] = useState()
    const [expense, setExpense] = useState([])
    const [editIndex, setEditIndex] = useState(null);

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

    // handleChange
    const handleChange = (event) => {
        const { name, value } = event.target;
        setExpenseData({ ...expenseData, [name]: value })
    }

    // handleSubmit
    const handleSubmit = (event) => {
        event.preventDefault()

        if (
            !expenseData.name.trim() ||
            !expenseData.amount.trim() ||
            !expenseData.category.trim() ||
            !expenseData.date.trim()
        ) {
            toast.error('All fields are required!')
            return;
        }

        if (expenseData.amount <= 0) {
            toast.error("Amount must not be zero");
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

        const newExpense = { ...expenseData, amount: parseFloat(expenseData.amount) };

        if (editIndex === null) {
            // Add new expense
            setExpense([...expense, newExpense]);
            toast.success('Expense added successfully');
        } else {
            // Update existing expense
            const updatedExpenses = [...expense];
            updatedExpenses[editIndex] = newExpense;
            setExpense(updatedExpenses);
            toast.success('Expense updated successfully');
            setEditIndex(null);
        }

        setExpenseData({
            name: '',
            amount: '',
            category: '',
            date: getTodayDate(),
        }); // Reset form
    }

    // handleEdit
    const handleEdit = (index) => {
        setEditIndex(index);
        setExpenseData(expense[index]); // Populate form fields with the selected todo item
    }

    // handleDelete
    const handleDelete = (index) => {
        const updatedTodo = expense.filter((_, i) => i !== index); // Remove todo without mutating state
        setExpense(updatedTodo);
        toast.success('Todo deleted successfuly')
    }

    useEffect(() => {
        const totalAmount = expense.reduce((acc, item) => acc + item.amount, 0);
        setTotal(totalAmount);
    }, [expense]);

    return (
        <section className="max-w-[1184px] mx-auto pt-12 px-6 sm:px-8 lg:px-12">
            <div className="text-center text-4xl font-extrabold text-gray-900 mb-8">
                <h1>Expense Management System</h1>
            </div>

            {/* Expense Input Form */}
            <div className="bg-white shadow-xl rounded-xl p-8 space-y-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Name and Amount Input */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-3">
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

                        <div className="flex flex-col gap-3">
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
                        <div className="flex flex-col gap-3">
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

                        <div className="flex flex-col gap-3">
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
                            value={editIndex === null ? "Add Expense" : "Update Expense"}
                            // Disable if fields are empty
                            // disabled={!todoData.title.trim() || !todoData.description.trim()}  
                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition duration-300 cursor-pointer" />
                    </div>
                </form>
            </div>

            {/* Expense List */}
            {expense && expense.length > 0 ? (
                <div className="overflow-x-auto mt-5">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Expense Name</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                expense.map((item, index) => (
                                    <tr key={index} className="hover:bg-base-200">
                                        <th>{index + 1}</th>
                                        <td>{item.name}</td>
                                        <td>Rs. {item.amount}</td>
                                        <td>{item.date}</td>
                                        <td>{item.category}</td>
                                        <td className="flex gap-4">
                                            <button
                                                type="button"
                                                className="text-lg"
                                                onClick={() => handleEdit(index)}>
                                                <FiEdit3 className="text-green-300 hover:text-green-500 transition" />
                                            </button>
                                            <button
                                                type="button"
                                                className="text-lg"
                                                onClick={() => handleDelete(index)}>
                                                <AiOutlineDelete className="text-red-300 hover:text-red-500 transition" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className="text-2xl mt-4 space-x-5">
                        <span className="font-bold">Total Expense: </span>
                        <span>Rs. {total}</span>
                    </div>
                </div>

            ) : (
                <div className="flex justify-center items-center mt-5">
                    <span >No Expenses Found</span>
                </div>
            )
            }

        </section>
    );
}
