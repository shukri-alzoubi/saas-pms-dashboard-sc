import { Link } from "react-router-dom";
import appData from '../../data/appData.json'
import appLogo from '../../assets/logo.svg'

const Sidebar = ({ path, onLogout }) => {
    const links = [
        { title: 'Dashboard', path: '/', icon: 'bi bi-speedometer2' },
        { title: 'Projects', path: '/projects', icon: 'bi bi-folder2-open' },
        { title: '', path: 'hr-1', type: 'hr' },
        { title: 'Settings', path: '/settings', icon: 'bi bi-gear' },
    ]

    return (<div className="sidebar text-white h-100">
        <div className="mb-5 px-2">
            <div className="d-flex align-items-center gap-3 w-100">
                <img src={appLogo} width={30} />
                <div className="fs-3 fw-bold">{appData.shortName}</div>
            </div>
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