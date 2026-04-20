import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import NavbarLayout from "../components/layout/Navbar";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotifier } from "../context/NotifierContext";
import { useSettings } from "../hooks/useSettings";
import { SettingsModel } from "../models/Settings";
import { auth } from "../config/firebase.config";
import TextModal from "../components/modals/Text.modal";

const Settings = () => {

    const {
        user,
        updateUserPassword,
        updateDisplayName,
        verifyEmail,
        deleteAccount
    } = useAuth();

    const {
        setLoading,
        showModal,
        closeModal,
        showToast
    } = useNotifier();

    const {
        isSettingsLoading,
        settings,
        updateSettings,
        reloadSettings
    } = useSettings();

    const [tempSettings, setTempSettings] = useState(SettingsModel.instance());

    // Password Form
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPasssword: '',
        visible: false,
    })

    useEffect(() => {
        setTempSettings(settings);
    }, [settings])

    // Toggle Loading while fetching settings
    useEffect(() => {
        setLoading(isSettingsLoading, 'Loading Settings ...')
    }, [isSettingsLoading]);

    const handleSaveChanges = async () => {
        setLoading(true, 'Updating Settings ...');
        try {

            // Check Display Name
            if (tempSettings.displayName !== user.displayName) {
                await updateDisplayName(tempSettings.displayName);
            }

            await updateSettings(tempSettings)
            setLoading(false, null, 1000, () => {
                showToast('All changes were saved', 'success')
            })
        } catch (error) {
            setLoading(false, null, 1000, () => {
                showToast('Something went wrong', 'danger')
            })
        }


    }

    // Update User Pasword
    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        setLoading(true, 'Updating Password ...');
        try {
            await updateUserPassword(passwordForm.currentPassword, passwordForm.newPasssword);

            setLoading(false, null, 1000, () => {
                showToast('Password was updated', 'success')
                setPasswordForm({ newPasssword: '', currentPassword: '', visible: false })
            });

        } catch (error) {
            setLoading(false, null, 1000, () => {
                showToast(error.message === 'wrong-password' ? 'wrong password' : 'something went wrong', 'danger');
                setPasswordForm({ newPasssword: '', currentPassword: '', visible: passwordForm.visible })
            });
        }
    }

    // Verify Email
    const handleVerifyEmail = async () => {
        setLoading(true, 'Verifying Email ...')
        try {
            let linkSent = await verifyEmail();
            if (linkSent) {
                setLoading(false, null, 1000, () => {
                    showToast('A link was sent to your email address', 'success')
                    setPasswordForm({ newPasssword: '', currentPassword: '', visible: false })
                });
            }
        } catch (error) {
            setLoading(false, null, 1000, () => {
                showToast(error.message);
            });
        }
    }

    // Delete User Account
    const handleDeleteAccount = async () => {
        showModal(<TextModal
            rquired
            type="password"
            placeholder={'Enter Password'}
            icon='bi bi-lock'
            title='Delete Account!'
            message={`By Confirming deletion all your data will be lost, are you surer you want to delete your account?`}
            confirmText={'Delete Account'}
            confirmColor='danger'
            onCancel={closeModal}
            onConfirm={async (currentPassword) => {
                setLoading(true, 'Deleting Account ...');
                try {
                    let completed = await deleteAccount(currentPassword);
                    if (completed) {
                        setLoading(false, null, 1000, () => {
                            showToast('Check your email for confirmation', 'danger')
                        });
                    }
                } catch (error) {
                    setLoading(false, null, 1000, () => {
                        showToast(error.message === 'wrong-password' ? 'wrong password' : 'something went wrong', 'danger');
                        setPasswordForm({ newPasssword: '', currentPassword: '', visible: passwordForm.visible })
                    });
                }
            }}
        />)
    }


    return (<NavbarLayout path="/settings" title={'User Settings'} subtitle={'Update your personal profile and account security.'}>


        <div className="row">
            <div className="col-12 text-end mb-3">
                <button className="btn btn-primary px-4" onClick={handleSaveChanges}>Save All Changes</button>
            </div>

            {/* Profile */}
            {/* ================================================== */}
            <div className="col-lg-8">
                <div className="content-card">
                    <h5 className="fw-bold mb-4">Profile Information</h5>

                    <div className="row g-3">
                        <div className="col-12">
                            <label className="form-label text-muted">Full Name</label>
                            <div className="input-group">
                                <input
                                    type="text" id="full-name" name="full-name" className="form-control w-100" placeholder="Full Name"
                                    value={tempSettings.displayName} onChange={(e) => setTempSettings({ ...tempSettings, displayName: e.target.value })} />
                            </div>
                        </div>
                        <div className="col-12">
                            <label className="form-label text-muted">Email Address</label>
                            <div className="input-group mb-2">
                                <input type="email" className="form-control" defaultValue={tempSettings.email} readOnly />
                                <div className="input-group-text">
                                    <i className={`bi bi-${tempSettings.emailVerified ? 'check-circle-fill text-success' : 'x-circle-fill text-danger'}`}></i>
                                </div>
                            </div>
                            <div className="text-end">
                                {tempSettings.emailVerified ?
                                    <Link className="link-success small">Verified</Link> :
                                    <Link className="link-danger small" onClick={handleVerifyEmail}>Verify Email</Link>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security & Password */}
                {/* ================================================== */}
                <div className="content-card">
                    <h5 className="fw-bold mb-4">Security</h5>
                    <form onSubmit={handleUpdatePassword} className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label text-muted">Current Password</label>
                            <div className="input-group">
                                <input
                                    type={passwordForm.visible ? "text" : "password"} className="form-control w-100" placeholder="••••••••" required
                                    value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} />
                            </div>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">New Password</label>
                            <div className="input-group">
                                <input
                                    type={passwordForm.visible ? "text" : "password"} className="form-control" placeholder="Enter new password" required
                                    value={passwordForm.newPasssword} onChange={(e) => setPasswordForm({ ...passwordForm, newPasssword: e.target.value })} />

                                {/* Show Or Hide Passwords */}
                                <div className="input-group-text cursor-pointer" onClick={() => setPasswordForm({ ...passwordForm, visible: !passwordForm.visible })}>
                                    <i className={`bi ${passwordForm.visible ? 'bi-eye-slash' : 'bi-eye'} text-secondary`}></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 text-end">
                            <button type="submit" className="btn btn-primary">Update Password</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="col-lg-4">
                <div className="content-card">
                    <h5 className="fw-bold mb-4">System Preferences</h5>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="small fw-medium">Email Notifications</span>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox"
                                checked={tempSettings.emailNotifications} onChange={(e) => setTempSettings({ ...tempSettings, emailNotifications: e.target.checked })} />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="small fw-medium">Weekly Reports</span>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input" type="checkbox"
                                checked={tempSettings.weeklyReports} onChange={(e) => setTempSettings({ ...tempSettings, weeklyReports: e.target.checked })} />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <span className="small fw-medium">Developer Mode</span>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input" type="checkbox"
                                checked={tempSettings.developerMode} onChange={(e) => setTempSettings({ ...tempSettings, developerMode: e.target.checked })} />
                        </div>
                    </div>
                </div>

                <div className="content-card ">
                    <h5 className="fw-bold text-white mb-3">Danger Zone</h5>
                    <p className="text-muted small mb-4">Deleting your account will permanently remove all micro-app data and project history.</p>
                    <button className="btn btn-danger w-100" onClick={handleDeleteAccount}>Delete My Account</button>
                </div>
            </div>

        </div>
    </NavbarLayout>);
}

export default Settings;