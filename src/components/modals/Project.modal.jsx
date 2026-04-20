import { useEffect, useState } from "react";
import { Project } from "../../models/Project.model";
import { formatDate } from "../../utils/helper";

const ProjectModal = ({ title, initialValue, onSubmit, onCancel }) => {

    const [project, setProject] = useState(Project.instance());

    useEffect(()=>{
        setProject(Project.instance(initialValue))
    }, [initialValue])

    const handleSubmitForm = (e)=>{
        e.preventDefault();
        onSubmit && onSubmit(project);
        onCancel && onCancel();
    }

    return (<>
        <div className="modal-header border-bottom border-secondary border-opacity-10 p-3 px-4">
            <div className="d-flex align-items-center">
                <div className="bg-primary rounded-3 p-1 px-2 me-3">
                    <i className="bi bi-sliders text-white fs-5"></i>
                </div>
                <h5 className="modal-title fw-bold mb-0">{title ?? 'Project Configuration'}</h5>
            </div>
            <button type="button" className="btn-close btn-close-white border-0 shadow-none" onClick={onCancel}></button>
        </div>

        <div className="modal-body p-4 pb-2">
            <form id="metadataForm" onSubmit={handleSubmitForm}>
                <div className="row g-3">

                    <div className="col-md-6">
                        <label className="form-label text-muted">Name</label>
                        <div className="input-group">
                            <input
                                type="text" className="form-control" placeholder="SaaS App, Micro App..." required
                                value={project.name} onChange={(e) => setProject({ ...project, name: e.target.value })} />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label text-muted">Development Status</label>
                        <div className="input-group">
                            <select
                                className="form-select" required
                                value={project.status} onChange={(e) => setProject({ ...project, status: e.target.value })}>
                                <option value="pending">Pending</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-12">
                        <label htmlFor="" className="form-label text-muted">Description</label>
                        <div className="input-group">
                            <textarea className="form-control" style={{minHeight: '200px'}}
                            value={project.description} onChange={(e) => setProject({ ...project, description: e.target.value })}></textarea>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="text-muted">
                            <span className="fw-">Created At</span> ({formatDate(project.createdAt)})
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <div className="modal-footer border-top border-secondary border-opacity-10 p-3 px-4">
            <button type="button" className="btn text-secondary border-0 me-auto btn-sm"
                onClick={onCancel}>Discard</button>
            <button type="submit" form="metadataForm" className="btn btn-primary btn-lg px-4 py-2">
                Save Changes
            </button>
        </div>
    </>);
}

export default ProjectModal;