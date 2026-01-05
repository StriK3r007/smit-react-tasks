import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

export default function DaisyUi() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [data, setData] = useState(null)
    const [userName, setUserName] = useState('strik3r007')

    const handleChange = (event) => {
        setUserName(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        if (!userName.trim()) {
            toast.error('Please enter github username!')
            return;
        }
        fetchUser(userName)
    }

    const fetchUser = async (name) => {
        try {
            setLoading(true);
            setError('');

            const response = await fetch(`https://api.github.com/users/${name}`, {
                headers: {
                    'Accept': 'application/vnd.github+json',
                    'User-Agent': 'react-app',
                },
            });
            if (response.status === 404) throw new Error('User not found');
            if (response.status === 403) throw new Error('GitHub API rate limit exceeded. Try again later.');
            if (!response.ok) throw new Error('Something went wrong.');

            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser(userName)
    }, [])

    // Render skeleton loader or error message if needed
    if (loading && !data) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <span className="loading loading-infinity loading-xl"></span>
            </div>
        );
    }

    if (error && !data) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <p className='text-red-500'>{error}</p>
            </div>
        );
    }

    return (
        <>
            <section className="full max-w-[1184px] min-h-screen mx-auto pt-10 px-4 sm:px-6 lg:px-8">
                <MyProfile />
                <Card loading={loading} data={data} />
                <Footer />
            </section>
        </>
    )
}

const MyProfile = () => {
    return (
        <nav class="navbar bg-base-200">
            <a class="btn btn-ghost text-xl">GitHub Profile</a>
        </nav>
    )
}

const Card = ({ loading, data }) => {
    return (
        <div class="card w-96 bg-base-100 shadow-xl my-10 mx-auto">
            <div class="card-body">
                <div className="flex items-center gap-4">
                    <div className="text-6xltext-primary">
                        <figure>
                            {loading ? (
                                <div className="skeleton h-32 w-32 rounded-full"></div>
                            ) : (
                                <img
                                    src={data?.avatar_url}
                                    alt="Movie"
                                    className="rounded-full w-32 h-32"
                                />
                            )
                            }
                        </figure>
                    </div>
                    <div>
                        {loading ? (
                            <div className="flex flex-col gap-4">
                                <div className="skeleton h-4 w-30"></div>
                                <div className="skeleton h-4 w-20"></div>
                            </div>
                        ) : (
                            <>
                                <h2 class="card-title">{data?.name}</h2>
                                <p>{data?.login}</p>
                            </>
                        )
                        }
                    </div>
                </div>
                <div className="flex justify-center items-center gap-10 mt-4">
                    <div className='flex flex-col items-center'>
                        {
                            loading ? (
                                <div className="flex flex-col gap-4">
                                <div className="skeleton h-4 w-10"></div>
                                <div className="skeleton h-4 w-15"></div>
                            </div>
                            ) : (
                                <>
                                    <span className='font-bold'>{data?.followers}</span>
                                    <span>Followers</span>
                                </>
                            )
                        }
                    </div>
                    <div className='flex flex-col items-center'>
                        {
                            loading ? (
                                <div className="flex flex-col gap-4">
                                    <div className="skeleton h-4 w-10"></div>
                                    <div className="skeleton h-4 w-15"></div>
                                </div>
                            ) : (
                                <>
                                    <span className='font-bold'>{data?.following}</span>
                                    <span>Following</span>
                                </>
                            )
                        }
                    </div>

                    <div className='flex flex-col items-center'>
                        {
                            loading ? (
                                <div className="flex flex-col gap-4">
                                <div className="skeleton h-4 w-10"></div>
                                <div className="skeleton h-4 w-15"></div>
                            </div>
                            ) : (
                                <>
                                    <span className='font-bold'>{data?.public_repos}</span>
                                    <span>Repositories</span>
                                </>

                            )
                        }
                    </div>
                </div>

                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Follow</button>
                </div>
            </div>
        </div>

    )
}

const Footer = () => {
    return (
        <footer class="footer footer-center p-4 bg-base-200 text-base-content">
            <p>© 2025 My Profile App</p>
        </footer>
    )
}