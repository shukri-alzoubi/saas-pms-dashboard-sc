import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotifier } from "../context/NotifierContext";

const Register = () => {
    const { createUser } = useAuth();
    const { setLoading, showToast } = useNotifier();

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        showPassword: false,
        error: null
    })

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormValues({ ...formValues, error: null });
        try {
            setLoading(true, 'Creating User ...');
            await createUser(formValues.email, formValues.password);
        } catch (error) {
            setLoading(false, null, 1000, () => {
                showToast(error.message, 'danger');
            })
        }
    }

    return (<>
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">

            <div className="card auth-card text-start">
                <div className="mb-2">
                    <h2 className="m-0 text-light mb-1">Register</h2>
                    <p className="small text-secondary">Saving money never became easier with US.</p>
                </div>

                <form onSubmit={handleFormSubmit}>

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

                    {/* Password */}
                    <div className="mb-4">
                        <label className="form-label" htmlFor="password">New Password</label>
                        <div className="input-group">
                            <div className="input-group-text"><i className="bi bi-lock"></i></div>

                            <input
                                id="passwrod" type={formValues.showPassword ? 'text' : 'password'} className="form-control" placeholder="Password"
                                value={formValues.password} onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                            />
                            <div className="input-group-text cursor-pointer" onClick={() => setFormValues({ ...formValues, showPassword: !formValues.showPassword })}>
                                <i className={`bi ${formValues.showPassword ? 'bi-eye-slash' : 'bi-eye'} text-secondary`}></i>
                            </div>
                        </div>
                    </div>



                    <button className="btn btn-primary w-100 mb-3">
                        Register
                    </button>

                    <div className="text-center">
                        Already have an Account? <a href="/login" className="link-primary fw-bold text-decoration-none">Login</a>
                    </div>
                </form>

            </div>
        </div>
    </>);
}

export default Register;