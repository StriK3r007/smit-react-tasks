import Placeholder from 'react-bootstrap/Placeholder';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react"

import Card from 'react-bootstrap/Card';

export default function BootstrapUi() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [userName, setUserName] = useState('strik3r007')
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch(`https://api.github.com/users/${userName}`)
            .then(response => response.json())
            .then(res => {
                console.log(res)
                setData(res)
            })
            .catch((err) => {
                console.log(err)
                setError(true)
            })
            .finally(() => {
                setLoading(false)
            })
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
        <>
            <section className="w-full max-w-[1184px] mx-auto pt-10 px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center text-3xl font-extrabold text-gray-900">
                    <h1>React Bootstrap</h1>
                </div>
                <div className='flex justify-center'>
                    <Card className='mt-10 w-full max-w-100'>
                        <div className='flex justify-center'>
                            {
                                loading ? (
                                    <Placeholder as="div" animation="glow">
                                        <Placeholder xs={12} className='w-25 h-25' />
                                    </Placeholder>
                                ) : (
                                    <Card.Img variant="top" src={data?.avatar_url} className='rounded-full w-30 h-30' />
                                )
                            }
                        </div>
                        <Card.Body>
                            {
                                loading ? (
                                    <Placeholder as="p" animation="glow">
                                        <Placeholder xs={12} />
                                    </Placeholder>
                                ) : (
                                    <>
                                        <Card.Title className='mx-auto'>{data?.name}</Card.Title>
                                        <Card.Subtitle className='mx-auto'><span className='text-emerald-600 font-bold'>@ </span>{data?.login}</Card.Subtitle>
                                    </>
                                )
                            }
                        </Card.Body>
                        <Card.Footer className='flex justify-center gap-10 border-t-4 border-b border-emerald-500 rounded-2xl p-4 shadow'>
                            <div className='flex flex-col items-center'>
                                {
                                    loading ? (
                                        <Placeholder as="p" animation="glow">
                                            <Placeholder xs={12} />
                                        </Placeholder>
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
                                        <Placeholder as="p" animation="glow">
                                            <Placeholder xs={12} />
                                        </Placeholder>
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
                                        <Placeholder as="p" animation="glow">
                                            <Placeholder xs={12} />
                                        </Placeholder>
                                    ) : (
                                        <>
                                            <span className='font-bold'>{data?.public_repos}</span>
                                            <span>Repositories</span>
                                        </>

                                    )
                                }
                            </div>
                        </Card.Footer>
                    </Card>
                </div>
            </section>
        </>
    )
};