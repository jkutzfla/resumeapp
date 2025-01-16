import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

  return (
	<nav id="navbar">
		<NavLink className='' to='/'>Home</NavLink> | <NavLink to='/prompt' className={linkClass}>Prompting</NavLink>
    </nav>
  );
};
export default Navbar;
