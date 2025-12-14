import { useEffect, useState } from 'react';

export default function OlxCards() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getData = async () => {
            // const url = 'https://fakestoreapi.com/products/';
            const url = 'https://api.escuelajs.co/api/v1/products/';
            const options = { method: 'GET', headers: { accept: 'application/json' } };

            try {
                const response = await fetch(url, options);
                const data = await response.json();
                setProducts(data)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    return (
        <>
            <section className='full max-w-[1184px] mx-auto pt-10 px-4 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-4 gap-30'>
                    {
                        products.length > 0 ? (
                            products.map(item => {
                                const { id, title, description, price } = item;
                                return (
                                    <Card
                                        key={id}
                                        title={title}
                                        imgSrc={item.images}
                                        desc={description}
                                        category={item.category.name}
                                        price={price}
                                    />
                                );
                            })
                        ) : (
                            <p>Loading...</p>
                        )
                    }
                </div>
            </section>
        </>
    );
}


function Card({ title, imgSrc, desc, price, category }) {
    return (
        <>
            <div className="card bg-base-100 w-80 lg:w-96 md:w-96 shadow-sm">
                <figure className="bg-gray-100">
                    <img src={imgSrc[0]} alt={title} />
                </figure>
                <div className="card-body bg-gray-500">
                    <div className="flex gap-4 items-center">
                        {
                            imgSrc.length > 0 && imgSrc.length <= 3 ? (
                                imgSrc.map((item, index) => {
                                    return <img key={index} src={item} alt={`Image of ${title}`} width={'100px'} />
                                })
                            )
                                : (
                                    <p>No image found</p>
                                )
                        }
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
        </>
    );
}