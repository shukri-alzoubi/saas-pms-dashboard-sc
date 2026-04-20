const Header = ({title = 'Header', subtitle, actionButton}) => {
    return (<>
        <header className="d-flex justify-content-between align-items-center mb-3">
            <div>
                <h2 className="fw-bold">{title}</h2>
                {subtitle && <p className="text-secondary small m-1">{subtitle}</p>}
            </div>
            <div className="d-lg-none">
                {actionButton}
            </div>
        </header>
    </>);
}

export default Header;