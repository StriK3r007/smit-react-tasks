import { useState } from "react"
import toast from "react-hot-toast";

export default function TodoApp() {
    const [todoData, setTodoData] = useState({
        title: '',
        description: '',
    });

    const [todo, setTodo] = useState([])
    const [editIndex, setEditIndex] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target; 
        // const value = event.target.value
        // const name = event.target.title
        // const description = event.target.description

        setTodoData({ ...todoData, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if(!todoData.title.trim() || !todoData.description.trim()) {
            toast.error('Please enter a title and description for the todo!')
            return;
        }

        if(editIndex === null) {
            // add new todo
            setTodo([...todo, todoData]);
            toast.success('Todo created successfuly')
        } else {
            const updatedTodo = [...todo];
            updatedTodo[editIndex] = todoData; 
            
            // Update existing todo
            setTodo(updatedTodo);
            toast.success('Todo edited successfuly')
            // Reset edit mode
            setEditIndex(null); 
        }
        setTodoData({ title: '', description: '' }); // Reset form
    }

    const handleEdit = (index) => {
        setEditIndex(index);
        setTodoData(todo[index]); // Populate form fields with the selected todo item
    }

    const handleDelete = (index) => {
        const updatedTodo = todo.filter((_, i) => i !== index); // Remove todo without mutating state
        setTodo(updatedTodo);
        toast.success('Todo deleted successfuly')

        // console.log(index)
        // todo.splice(index, 1)
        // setTodo([...todo])
    }

    return (
        <>
            <section className="w-full max-w-[1184px] mx-auto pt-10 px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center text-3xl font-extrabold text-gray-900">
                    <h1>Todo App</h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-base-300 rounded-2xl p-4 space-y-4">
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="title"
                            className="form-label text-2xl">
                            Title
                        </label>
                        <input
                            type="text" 
                            id="title" 
                            name="title"
                            value={todoData.title} 
                            placeholder="Type title" 
                            onChange={handleChange} 
                            className="rounded-field p-2 border-2 border-gray-400 focus:outline-0 focus-within:border-orange-600" 
                            maxLength={100}
                            />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label 
                            htmlFor="description" 
                            className="form-label text-2xl">
                            Description
                        </label>
                        <input 
                            type="text" 
                            id="description" 
                            name="description"
                            value={todoData.description}
                            placeholder="Type description" 
                            onChange={handleChange} 
                            className="rounded-field p-2 border-2 border-gray-400 focus:outline-0 focus-within:border-orange-600" />
                    </div>
                    <div className="flex justify-center">
                        <input 
                            type="submit"
                            // Dynamically change button text
                            value={editIndex === null ? "Add Todo" : "Update Todo"}
                            // Disable if fields are empty
                            // disabled={!todoData.title.trim() || !todoData.description.trim()}  
                            className="btn btn-primary" />
                    </div>
                </form>

                <div>
                    <ul className="space-y-2">
                        {
                            todo.length > 0 ? (
                                todo.map((item, index) => {
                                    return (
                                        <li key={index} className="flex justify-between items-center p-2 bg-amber-100 rounded">
                                            <div className="flex flex-col space-y-2">
                                                <span>Title: {item.title}</span>
                                                <span>Description: {item.description}</span>
                                            </div>
                                            <div className="flex gap-4">
                                                <input 
                                                    type="button" 
                                                    value="Edit" 
                                                    onClick={() => handleEdit(index)} 
                                                    className="btn btn-secondary" />
                                                <input 
                                                    type="button" 
                                                    value="Delete" 
                                                    onClick={() => handleDelete(index)} 
                                                    className="btn btn-error" />
                                            </div>
                                        </li>
                                    )
                                })
                            ) : (
                                <h1 className="text-center text-2xl text-red-500 font-bold">No Todos Found!</h1>
                            )
                        }
                    </ul>
                </div>
            </section>
        </>
    )
};
