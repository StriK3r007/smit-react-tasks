import { useEffect, useState } from 'react';

export default function OlxCards() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            // const url = 'https://fakestoreapi.com/products/';
            const url = 'https://api.escuelajs.co/api/v1/products/';
            const options = { method: 'GET', headers: { accept: 'application/json' } };

            try {
                const response = await fetch(url, options);
                if(!response.ok) throw new Error('Failed to fetch products')
                const data = await response.json();
                setProducts(data)
            } catch (error) {
                setError(error.message)
            } finally{
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
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-4 gap-30 content-center'>
                {products.map(item => {
                    const { id, title, description, price, category, images } = item;
                    return (
                        <Card
                            key={id}
                            title={title}
                            imgSrc={images}
                            desc={description}
                            category={category.name}
                            price={price}
                        />
                    );
                })}
            </div>
        </section>
    );
}


function Card({ title, imgSrc, desc, price, category }) {
    return (
        <div className="card bg-base-100 w-80 lg:w-96 md:w-96 shadow hover:shadow-lg cursor-pointer">
            <figure className="bg-gray-100">
                <img src={imgSrc?.[0] || 'https://via.placeholder.com/150'} alt={title} loading="lazy" />
            </figure>
            <div className="card-body bg-gray-500">
                <div className="flex gap-4 items-center justify-center">
                    {imgSrc && imgSrc.length > 0 ? (
                        imgSrc.slice(0, 3).map((item, index) => (
                            <img
                                key={index}
                                src={item}
                                alt={`Image of ${title}`}
                                loading="lazy"
                                className='w-20 lg:w-24 md:w-22'
                            />
                        ))
                    ) : (
                        <p>No image available</p>
                    )}
                </div>
                <h2 className="card-title">{title}</h2>
                <p>{category}</p>
                <p>{desc}</p>
                <h2 className="text-2xl font-semibold text-accent">${price}</h2>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
}