const ConfirmModal = ({ title, message, confirmText, confirmColor, onConfirm, onCancel }) => {

    const handleConfirm = ()=>{
        onConfirm && onConfirm();
        onCancel && onCancel();
    }

    return (<>
        <div className="modal-header border-bottom border-secondary border-opacity-10 p-3 px-4">
            <div className="d-flex align-items-center">
                <h5 className="modal-title fw-bold mb-0">{title ?? 'Project Configuration'}</h5>
            </div>
            <button type="button" className="btn-close btn-close-white border-0 shadow-none" onClick={onCancel}></button>
        </div>

        <div className="modal-body p-4 pb-2">
            <p className="text-muted" dangerouslySetInnerHTML={{__html: message}}></p>
        </div>

        <div className="modal-footer border-top border-secondary border-opacity-10 p-3 px-4">
            <button 
                type="submit"  onClick={handleConfirm}
                className={`btn btn-${confirmColor ?? 'primary'} px-4 w-100`}>
                {confirmText ?? 'Confirm'}
            </button>
        </div>
    </>);
}

export default ConfirmModal;