import { Link } from "react-router-dom";

const Sidebar = ({ path, onLogout }) => {
    const links = [
        { title: 'Dashboard', path: '/', icon: 'bi bi-speedometer2' },
        { title: 'Projects', path: '/projects', icon: 'bi bi-folder2-open' },
        { title: '', path: 'hr-1', type: 'hr' },
        { title: 'Settings', path: '/settings', icon: 'bi bi-gear' },
    ]

    return (<div className="sidebar text-white h-100">
        <div className="mb-5 px-2">
            <h3 className="fw-bold"><i className="bi bi-x-diamond-fill text-primary me-2"></i>SaaS</h3>
        </div>

        <nav className="nav flex-column">
            {links.map((link) => link.type === 'hr' ?
                <hr key={link.path} className="my-4 border-secondary" /> :
                <Link key={link.path} className={`nav-link ${path === link.path && 'active'}`} to={link.path}>
                    <i className={link.icon}></i> {link.title}
                </Link>
            )}
            <Link className="nav-link mt-5 text-danger" onClick={onLogout}>
                <i className="bi bi-box-arrow-left"></i> Logout
            </Link>
        </nav>
    </div>);
}

export default Sidebar;