import appData from '../../data/appData.json';
import logo from '../../assets/logo.svg'

const Loading = ({className, message = 'Loading ...'}) => {
    return (<>
        <div className={className ?? 'vh-100 d-flex flex-column align-items-center justify-content-center'}>
            <div className="loading-wrapper">
                <div className="loader-icon">
                    {/* <i className="bi bi-x-diamond-fill text-primary"></i> */}
                    <img src={logo} width={70} alt="" />
                </div>

                <span className="brand-name">{appData.appName}</span>

                <div className="loading-bar-container">
                    <div className="loading-bar-progress"></div>
                </div>

                <p className="loading-status" id="status-text">{message}</p>
            </div>
        </div>
        
    </>);
}

export default Loading;