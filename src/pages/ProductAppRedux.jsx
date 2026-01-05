import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../config/redux-config/reducers/cartSlice";
import { FaOpencart } from "react-icons/fa6";

export default function ProductAppRedux() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dispatch = useDispatch()
    const cartSelector = useSelector(state => state.cart.cart)

    useEffect(() => {
        const getData = async () => {
            // const url = 'https://fakestoreapi.com/products/';
            // const url = 'https://api.escuelajs.co/api/v1/products/';
            const url = 'https://dummyjson.com/products';
            const options = { method: 'GET', headers: { accept: 'application/json' } };

            try {
                const response = await fetch(url, options);
                if (!response.ok) throw new Error('Failed to fetch products')
                const data = await response.json();
                setProducts(data?.products)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [])

    const AddToCart = (id) => {
        dispatch(addProduct({ product: products[id] }))
        console.log("Product Added", id)
        console.log("Cart", cartSelector)
    }

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
            <div className="text-center text-4xl font-extrabold text-gray-900 mb-8">
                <h1>Product App Using Redux</h1>
            </div>
            <div className="flex justify-end items-center gap-4">
                <div className="relative mr-4 tooltip" data-tip="Cart">
                    <FaOpencart className="size-6" />
                    <span className="absolute -top-3 -right-3 bg-base-300 text-gray-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{cartSelector.length}
                    </span>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-4 gap-30 content-center'>
                {products.map(item => {
                    const { id, title, description, price, category, images } = item;
                    return (
                        <ProductCard
                            key={id}
                            title={title}
                            imgSrc={images}
                            desc={description}
                            category={category.name}
                            price={price}
                            AddToCart={AddToCart}
                            index={id}
                        />
                    );
                })}
            </div>
        </section>
    )
};


const ProductCard = ({ title, imgSrc, desc, price, category, AddToCart, index }) => {
    const [productImage, setProductImage] = useState(imgSrc?.[0])
    return (
        <div className="card bg-base-100 w-80 lg:w-96 md:w-96 shadow hover:shadow-lg cursor-pointer">
            <figure className="bg-gray-100">
                <img src={productImage || 'https://via.placeholder.com/150'} alt={title} loading="lazy" />
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
                                onClick={() => setProductImage(imgSrc[index])}
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
                    <Button type={'button'} value={"Add To Cart"} classname={'btn-primary'} AddToCart={AddToCart} id={index} />
                    <Button type={'button'} value={"Buy Now"} classname={'btn-secondary'} />
                </div>
            </div>
        </div>
    )
};

const Button = ({ type, value, classname, AddToCart, id }) => {
    return (
        <button type={type} className={`btn ${classname}`} onClick={() => AddToCart(id)} >{value}</button>
    )
};