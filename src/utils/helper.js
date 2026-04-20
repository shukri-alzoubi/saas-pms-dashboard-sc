export const generateId = ()=> new Date().getTime().toString();

export const dateNow = () => new Date().toLocaleString();

/**
 * Changes a date into a readable format
 * * @param {Date | String} date 
 * @returns {String}
 */
export function formatDate(date) {
    return !date ? '-' : new Date(date).toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
}