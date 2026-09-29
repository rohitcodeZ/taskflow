import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <nav className='bg-slate-900 border-b border-slate-800 h-16 flex justify-between items-center px-8 shadow-sm'>
            <div className='text-white text-2xl font-bold tracking-tight'>
                TO DO App
            </div>


            <ul className='flex items-center gap-6'>


                <li>
                    <Link
                        to="/"
                        className='text-slate-300 font-medium hover:text-white transition-colors duration-200'
                    >
                        List
                    </Link>
                </li>


                <li>
                    <Link
                        to="/add"
                        className='bg-amber-500 text-slate-900 font-semibold px-5 py-2 rounded-lg hover:bg-amber-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200'
                    >
                        Add Task
                    </Link>
                </li>

            </ul>
        </nav>
    )
}

export default NavBar