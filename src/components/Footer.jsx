export default function Footer() {
    return (
        <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
            <aside className="flex flex-col sm:flex-row gap-2 sm:gap-10">
                <p>© {new Date().getFullYear()} - SMIT ReactJS Tasks.</p>
                <p>Created with <span aria-hidden="true">❤️</span> by Zubair Ahmed</p>
            </aside>
        </footer>
    )
};
