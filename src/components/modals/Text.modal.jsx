import { useEffect, useState } from "react";

const TextModal = ({
    title,
    message,
    rquired = false,
    initialValue,
    type = 'text',
    placeholder,
    icon,
    confirmText,
    confirmColor,
    onConfirm,
    onCancel
}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm && onConfirm(value);
        onCancel && onCancel();
    }

    const [showValue, setShowValue] = useState(false);
    const [value, setValue] = useState(initialValue ?? '')
    
    return (<form onSubmit={handleSubmit}>
        <div className="modal-header border-bottom border-secondary border-opacity-10 p-3 px-4">
            <div className="d-flex align-items-center">
                <h5 className="modal-title fw-bold mb-0">{title ?? 'Project Configuration'}</h5>
            </div>
            <button type="button" className="btn-close btn-close-white border-0 shadow-none" onClick={onCancel}></button>
        </div>

        <div className="modal-body p-4 pb-2">
            <p className="text-muted" dangerouslySetInnerHTML={{ __html: message }}></p>

            <div className="input-group mb-3">
                {icon && <div className="input-group-text"><i className={icon}></i></div>}

                <input
                    type={showValue ? 'text' : type ?? 'text'} required={rquired}
                    className="form-control" placeholder={placeholder}
                    value={value ?? ''} onChange={(e) => setValue(e.target.value)} />

                {type === 'password' &&
                    <div className="input-group-text cursor-pointer" 
                        onClick={() => setShowValue(!showValue)}>
                        <i className={`bi ${showValue ? 'bi-eye-slash' : 'bi-eye'} text-secondary`}></i>
                    </div>}
            </div>
        </div>

        <div className="modal-footer border-top border-secondary border-opacity-10 p-3 px-4">
            <button
                type="submit"
                className={`btn btn-${confirmColor ?? 'primary'} px-4 w-100`}>
                {confirmText ?? 'Confirm'}
            </button>
        </div>
    </form>);
}

export default TextModal;