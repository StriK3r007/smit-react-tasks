    import Page404 from '../../public/3.png';

    export default function PageNotFound() {
        return (
            <>
                <section className="full max-w-[1184px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center">
                        <img
                            // src="../../public/404_page_not_found.png"
                            src={Page404}
                            className="w-120 h-120 object-contain"
                            alt="404 - Page Not Found"
                        />
                        <div className="text-center">
                        <p className="text-2xl font-bold">Oops! Page Not Found</p>
                        </div>
                    </div>
                </section>
            </>
        )
    }