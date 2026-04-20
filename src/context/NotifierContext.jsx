import { createContext, useContext, useEffect, useState } from "react";
import Loading from "../components/layout/Loading";
import { Modal, Toast } from "bootstrap";

const NotifierContext = createContext(null);

export const NotifierProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState({
        enabled: false,
        message: null,
    });

    const setLoading = (enabled = false, message, delay = 1000, onHidden = (() => { })) => {
        if (enabled) {
            setIsLoading({
                enabled: enabled,
                message: message,
            })
        } else {
            setTimeout(() => {
                setIsLoading({
                    enabled: enabled,
                    message: message,
                })

                onHidden();
            }, delay)
        }
    }



    // Modal And Toast
    // ==============================================

    const [modal, setModal] = useState({ isOpen: false, content: null, options: {} });
    const [toast, setToast] = useState({ show: false, message: "", color: "primary" });

    useEffect(() => {

        // Modal
        const modalElement = document.getElementById('notifier-modal');
        const modalCallback = () => { setModal({ isOpen: false, content: null, options: {} }) }
        modalElement.addEventListener('hidden.bs.modal', modalCallback);

        // Toast
        const toastElement = document.getElementById('liveToast');
        const toastCallback = () => { setToast({ show: false, message: "", color: "primary" }) }
        toastElement.addEventListener('hidden.bs.modal', toastCallback);


        return () => {
            modalElement.removeEventListener('hidden.bs.modal', modalCallback);
            toastElement.removeEventListener('hidden.bs.modal', toastCallback);
        }
    }, [])

    const openModal = () => {
        const modal = Modal.getOrCreateInstance(document.getElementById('notifier-modal'));
        modal.show();
    }

    const showModal = useCallback((children, options = {}) => {
        setModal({ isOpen: true, content: children, options });
        openModal();
    }, []);

    const closeModal = useCallback(() => {
        const instance = Modal.getOrCreateInstance(document.getElementById('notifier-modal'));
        instance.hide();
    }, []);

    const showToast = useCallback((message, color = "primary") => {
        setToast({ show: true, message, color });

        // To Give Time for state to change
        setTimeout(() => {
            const instance = Toast.getOrCreateInstance('#liveToast');
            instance.show();
        }, 200);

    }, []);

    return <NotifierContext.Provider value={{ isLoading, setLoading, showModal, closeModal, showToast }}>
        {/* Loading */}
        {isLoading.enabled && <Loading message={isLoading.message} />}

        {/* Children */}
        <div className={`${isLoading.enabled && 'd-none'}`}>{children}</div>

        {/* --- Bootstrap Modal Markup --- */}
        <div
            id="notifier-modal"
            className="modal fade" tabIndex="-1"
            onClick={closeModal}
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className={`modal-dialog modal-dialog-centered ${modal.options.size || ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="modal-content border-0 shadow-lg" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-main)' }}>
                    {modal.content}
                </div>
            </div>
        </div>

        {/* --- Bootstrap Toast Markup --- */}
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="liveToast" className={`toast text-bg-${toast?.color ?? 'primary'}`} role="alert" aria-live="assertive" aria-atomic="true">
                <div className={` d-flex `}>
                    <div className="toast-body">
                        {toast?.message}
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>

    </NotifierContext.Provider>
}

/**
 * 
 * @returns {{
 * setLoading : (enabled: boolean, message: string | null) => void,
 * showModal : (children, options) => void,
 * closeModal: ()=>void,
 * showToast: (message: string, color: string) => void,
 * }}
 */
export const useNotifier = () => useContext(NotifierContext)