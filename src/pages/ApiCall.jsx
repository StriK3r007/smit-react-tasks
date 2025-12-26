import { useEffect, useState } from 'react';

export default function ApiCall() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const url = 'https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=10';
            const options = { method: 'GET', headers: { accept: 'application/json' } };

            try {
                const response = await fetch(url, options);
                if (!response.ok) throw new Error('Failed to fetch users')
                const data = await response.json();
                setUsers(data?.data?.data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [])

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
        <section className='full max-w-[1184px] mx-auto pt-10 px-4 sm:px-6 lg:px-8'>
            <div className="overflow-x-auto">
            {
                users && users.length > 0 ? (
                    <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sr.no</th>
                            <th>Profile Picture</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone#</th>
                            <th>Cell#</th>
                            <th>Nationality</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr key={user.id || index}>
                                    <th>{index + 1}</th>
                                    <th><img src={user.picture.medium} className='rounded-full'/></th>
                                    <td>{user.name.first} {user.name.last}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.cell}</td>
                                    <td>{user.nat}</td>
                                    <td>{user.gender}</td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                ) : (
                    <h1>No User data found</h1>
                )
            }
                
            </div>
        </section>
    );
}