import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotifier } from "../context/NotifierContext";

const ForgetPassword = () => {

    const {setLoading, showToast} = useNotifier();
    const {restPasswordLink} = useAuth();

    const [formValues, setFormValues] = useState({
        email: '',
        error: '',
        isSent: false,
    })

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setLoading(true, 'Sending Link ...')
        try {
            await restPasswordLink(formValues.email);
             setFormValues({isSent: true});
        } catch (error) {
             showToast(error.message, 'danger');
             console.log(error)
        }

        setLoading(false)
    }

    return (<div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="card auth-card text-start ">
            {!formValues.isSent && <form onSubmit={handleFormSubmit}>

                <div className="mb-2">
                    <h2 className="m-0 text-light mb-1">Reset Password</h2>
                    <p className="small text-secondary">Enter your email so we can sent you a password reset link</p>
                </div>

                {/* Email Address */}
                <div className="mb-3">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <div className="input-group">
                        <div className="input-group-text"><i className="bi bi-at"></i></div>
                        <input
                            id="email" type="email" className="form-control" placeholder="Email Address"
                            value={formValues.email} onChange={(e) => setFormValues({ ...formValues, email: e.target.value })} />
                    </div>
                </div>

                <button className="btn btn-primary w-100 mb-4">
                    Reset
                </button>

            </form>}


            {formValues.isSent && <div className="py-4 text-center">
                <h1 className="display-1 text-success">
                    <i className="bi bi-check2-circle"></i>
                </h1>

                <p>
                    A reset password link was sent <br /> to your email address <br /> Successfuly
                </p>
            </div>}


            <div>
                <a href="/login" className="link-secondary text-decoration-none">
                    <i className="bi bi-arrow-left"></i> Back To Login
                </a>
            </div>


        </div>

    </div>);
}

export default ForgetPassword;