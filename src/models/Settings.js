export class SettingsModel {

    /** @type {string} */ uid;
    /** @type {string?} */ displayName;
    /** @type {string?} */ email;
    /** @type {string?} */ photoURL;
    /** @type {string?} */ createdAt;
    /** @type {string?} */ lastActive;
    /** @type {boolean} */ emailVerified;
    /** @type {boolean} */ emailNotifications;
    /** @type {boolean} */ weeklyReports;
    /** @type {boolean} */ developerMode;

    /**
     * Create an instance of settingsModal
     * @param {SettingsModel} values 
     * @returns {SettingsModel}
     */
    static instance(values = {}){
        return JSON.parse(JSON.stringify({
            uid: values.uid,
            displayName: values.displayName ?? '',
            email: values.email,
            photoURL: values.photoURL,
            createdAt: values.createdAt,
            lastActive: values.lastActive,
            emailVerified: values.emailVerified ?? false,
            emailNotifications: values.emailNotifications ?? false,
            weeklyReports: values.weeklyReports ?? false,
            developerMode: values.developerMode ?? false,
        }))
    }
}