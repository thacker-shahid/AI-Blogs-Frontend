import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import {useState} from "react";

export default function Navbar(){

    const navList = [
        {name: 'Home', path: '/'},
        {name: 'About Us', path: '/about-us'},
        {name: 'Privacy Policy', path: '/privacy-policy'},
        {name: 'Contact Us', path: '/contact-us'}
    ];

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = ()=>{
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <>
            <header className="bg-gray-100 border">
                <nav className="container mx-auto flex justify-between px-5">
                    < a href="/"><img src="./logo.png" alt="Logo" className="h-16 w-24"/></a>
                    <ul className="sm:flex hidden items-center gap-8">
                        {navList.map(item=>(
                            <li key={item.name}>
                                <NavLink to={`${item.path}`}
                                    className={
                                        ({ isActive }) =>
                                        isActive ? "active" : ""
                                    }>
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                        <li>
                            <NavLink to={'/login'}>Login</NavLink>
                        </li>
                    </ul>
                    
                    {/* Toggle Menu Button */}
                    <div className="flex items-center sm:hidden">
                        <button onClick={toggleMenu} className="flex items-center bg-primary bg-[#fafafa] px-3 py-4 rounded text-sm text-gray-500 hover:text-gray-900">
                            {isMenuOpen ? <IoCloseSharp className="size-6"/>: <GiHamburgerMenu className="size-6"/>}
                        </button>
                    </div>

                    {/* Toggle Menu Items */}
                    {
                        isMenuOpen &&
                        <ul className="fixed top-[108px] left-0 w-full h-auto pb-8 border-b bg-white shadow-sm">
                            {navList.map(item=>(
                                <li key={item.name} className="mt-5 px-4">
                                    <NavLink to={`${item.path}`}
                                        onClick={()=> setIsMenuOpen(false)}
                                        className={
                                            ({ isActive }) =>
                                            isActive? "active" : ""
                                        }>
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    }
                </nav>
            </header>
        </>
    )
}