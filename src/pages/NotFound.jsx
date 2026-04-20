const NotFound = () => {
    return (<>
        <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
            <div class="error-container">
                <span class="error-tag">Error 404</span>
                <h1 class="error-code">404</h1>
                <p class="error-message">
                    The page you're looking for has been moved or doesn't exist. Let's get you back to your workspace.
                </p>
                <a href="/" id="dynamic-home-btn" class="btn btn-primary btn-lg">
                    <div className="d-flex gap-3">
                        <i class="bi bi-house-door" id="home-btn-icon"></i>
                        <span id="home-btn-text">Back to Home</span>
                    </div>
                </a>
            </div>
        </div>
    </>);
}

export default NotFound;