const Loading = ({className, message = 'Loading ...'}) => {
    return (<>
        <div className={className ?? 'vh-100 d-flex flex-column align-items-center justify-content-center'}>
            <div className="loading-wrapper">
                <div className="loader-icon">
                    <i className="bi bi-x-diamond-fill text-primary"></i>
                </div>

                <span className="brand-name">SaaS Dashboard</span>

                <div className="loading-bar-container">
                    <div className="loading-bar-progress"></div>
                </div>

                <p className="loading-status" id="status-text">{message}</p>
            </div>
        </div>
        
    </>);
}

export default Loading;