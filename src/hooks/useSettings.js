import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext";
import { SettingsModel } from "../models/Settings";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";

export const useSettings = () => {

    const { user } = useAuth();
    const [settings, setSettings] = useState(SettingsModel.instance());
    const [isSettingsLoading, setSettingsLoading] = useState(true);

    useEffect(() => {
        if (!user) return () => {
            setSettingsLoading(false);
            setSettings(SettingsModel.instance());
        }

        const unsub = onSnapshot(doc(db, `users/${user.uid}`), (snapshot) => {
            if (snapshot.exists()) {
                setSettings(SettingsModel.instance(snapshot.data()));
            } else {
                initialize();
                setSettings(SettingsModel.instance());
            }

            setSettingsLoading(false)
        })

        return () => unsub();

    }, [user]);

    // Initialize User Settings
    const initialize = async () => {
        if (!user) return () => {
            setSettings(SettingsModel.instance());
        }

        try {
            const userDoc = doc(db, `users/${user.uid}`);
            await setDoc(userDoc, SettingsModel.instance({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                emailVerified: user.emailVerified,
                createdAt: user.metadata.creationTime,
                lastActive: user.metadata.lastSignInTime,
                photoURL: user.photoURL,
            }))
        } catch (error) {
            console.log(error.message);
        }
    }


    const updateSettings = async (newSettings) => {
        if (!user) return () => {
            setSettings(SettingsModel.instance());
        }

        try {
            const userDoc = doc(db, `users/${user.uid}`);
            await setDoc(userDoc, SettingsModel.instance({
                ...newSettings,
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                emailVerified: user.emailVerified,
                createdAt: user.metadata.creationTime,
                lastActive: user.metadata.lastSignInTime,
                photoURL: user.photoURL,
            }))
        } catch (error) {
            console.log(error.message);
        }
    }

    return {
        isSettingsLoading,
        settings,
        updateSettings,
    }
}