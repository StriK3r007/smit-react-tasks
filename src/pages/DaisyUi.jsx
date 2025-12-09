import { FaDev } from "react-icons/fa";

export default function DaisyUi() {
    return (
        <>
            <section className="full max-w-[1184px] mx-auto pt-10 px-4 sm:px-6 lg:px-8">
                <MyProfile />
                <Card />
                <Footer/>
            </section>
        </>
    )
}

const MyProfile = () => {
    return (
        <nav class="navbar bg-base-200">
            <a class="btn btn-ghost text-xl">My Profile</a>
        </nav>
    )
}

const Card = () => {
    return (
        <div class="card w-96 bg-base-100 shadow-xl my-10 mx-auto">
            <figure>
                <img src="https://placekitten.com/300/200" alt="User" />
            </figure>
            <div class="card-body">
                <div className="flex items-center gap-4">
                <div className="text-6xl -rotate-45 text-primary">
                    <FaDev />
                </div>
                <div>
                <h2 class="card-title">Zubair Ahmed</h2>
                <p>MERN Stack Developer...</p>
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