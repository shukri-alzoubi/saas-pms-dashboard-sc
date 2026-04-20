import { dateNow, generateId } from "../utils/helper";

export class Project {
    /** @type {string} */ uid;
    /** @type {string} */ id;
    /** @type {'pending' | 'active' | 'completed'} */ status;
    /** @type {string} */ name;
    /** @type {string} */ description;
    /** @type {string} */ createdAt;
    /** @type {string} */ updatedAt;

    /**
     * Creates an instance of Project
     * @param {Project} values 
     * @returns {Project}
     */
    static instance(values = {}){

        return JSON.parse(JSON.stringify({
            id: values.id ?? generateId(),
            uid: values.uid,
            name: values.name ?? '',
            status: values.status ?? 'pending',
            description: values.description ?? '',
            createdAt: values.createdAt ?? Date.now(),
            updatedAt: values.updatedAt ?? Date.now(),
        }))
    }
}