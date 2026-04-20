import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext"
import { auth, db } from "../config/firebase.config";
import { Project } from "../models/Project.model";
import { useEffect, useState } from "react";

export const useProjects = () => {

    const { user } = useAuth();

    const [isProjectLoading, setProjectsLoading] = useState(true);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (!user) return () => setProjects([]);

        const q = query(
            collection(db, 'projects'),
            where('uid', '==', user.uid),
            orderBy("createdAt", "desc"),
        );
        const unsub = onSnapshot(q, (querySnapshot) => {
            const list = querySnapshot.docs.map((doc) => Project.instance(doc.data()));
            setProjects(list);
            setProjectsLoading(false)
        });

        return () => unsub();
    }, [])

    const insertProject = async (project) => {
        try {
            if (!user) throw new Error('User not found');

            const newDoc = doc(collection(db, 'projects'))
            
            const docRef = await setDoc(newDoc, Project.instance({
                ...project,
                id: newDoc.id,
                uid: user.uid,
                createdAt: null,
            }));

            return true;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    const updateProject = async (newProject) => {
        try {
            if (!user) throw new Error('User not found');

            let docRef = doc(db, `projects/${newProject.id}`);
            await updateDoc(docRef, Project.instance({
                uid: user.uid,
                ...newProject,
                updatedAt: null,
            }))

            return true;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    const deleteProject = async (project) => {
        try {
            if (!user) throw new Error('User not found');

            let docRef = doc(db, `projects/${project.id}`);
            await deleteDoc(docRef);

            return true;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    return {
        projects,
        isProjectLoading,
        insertProject,
        updateProject,
        deleteProject
    }
}