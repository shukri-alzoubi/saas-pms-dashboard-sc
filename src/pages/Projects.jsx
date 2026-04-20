import { useEffect, useMemo, useState } from "react";
import Header from "../components/layout/Header";
import NavbarLayout from "../components/layout/Navbar";
import { useProjects } from "../hooks/useProjects";
import { useNotifier } from "../context/NotifierContext";
import { Project } from "../models/Project.model";
import { useAuth } from "../context/AuthContext";
import { Modal } from "bootstrap";
import ProjectModal from "../components/modals/Project.modal";
import ConfirmModal from "../components/modals/ConfirmModal";
import { formatDate } from "../utils/helper";
import { useLocation, useSearchParams } from "react-router-dom";
import { LazyItem } from "../components/layout/LazyItem";
import { mock_projects } from "../data/mock_projects";

const Projects = () => {

    const location = useLocation();
    const { user } = useAuth();

    const {
        setLoading,
        showModal,
        closeModal,
        showToast
    } = useNotifier();

    const {
        isProjectLoading,
        projects,
        insertProject,
        updateProject,
        deleteProject,
    } = useProjects();

    // Search Params
    const [searchParams, setSearchParams] = useSearchParams();
    const [filter, setFilter] = useState({
        query: '',
        status: '',
    })

    // Filtered Projects
    const filtered = useMemo(() => projects.filter((p) => {
        const query = searchParams.get('query');
        const status = searchParams.get('status');

        const inQuery = !query || p.name.toLowerCase().includes(query.toLowerCase());
        const inStatus = !status || p.status === status;;

        return inQuery && inStatus;
    }), [projects, location])

    // Toggle Loading
    useEffect(() => {
        setLoading(isProjectLoading, isProjectLoading ? 'Loading Projects ...' : null)
    }, [isProjectLoading]);

    // Submit Filters
    const handleSubmitFilters = (e) => {
        e.preventDefault()
        setSearchParams(filter);
    }

    // A Function used only in development mode inset 30 projects
    const uploadMockProjects = async () => {
        setLoading(true, 'Adding Projects, Pleas Wait ...')

        for (let i = 0; i < mock_projects.length; i++) {

            let progress = Math.floor((i / mock_projects.length) * 100)

            setLoading(true, `${progress}% Adding Projects, Please Wait ...`);
            const project = mock_projects[i];
            await insertProject(project);

        }

        setLoading(false);
    }

    // New Projct 
    const handleAddProject = async () => {
        showModal(<ProjectModal
            onCancel={closeModal}
            title={'New Project'}
            onSubmit={async (project) => {
                setLoading(true, 'Adding New Project ...')
                try {
                    await insertProject(project);
                    showToast('Project was added', 'success')
                } catch (error) {
                    console.log(error.message);
                    showToast('Somthing went wrong', 'danger')
                }
                setLoading(false)
            }}
        />, { size: 'modal-lg' })
    }

    // Handle Update Project
    const handleUpdateProject = async (project) => {
        showModal(<ProjectModal
            initialValue={project}
            onCancel={closeModal}
            title={'New Project'}
            onSubmit={async (project) => {
                setLoading(true, 'Updating Project ...')
                try {
                    await updateProject(project);
                    showToast('Project was updated', 'success')
                } catch (error) {
                    console.log(error.message);
                    showToast('Somthing went wrong', 'danger')
                }
                setLoading(false)
            }}
        />, { size: 'modal-lg' })
    }

    // Handle Delete Project
    const handleDeleteProject = async (project) => {
        showModal(<ConfirmModal
            title='Delete'
            message={`Do you want to delete <b>${project.name}</b>?`}
            confirmText='Delete'
            confirmColor='danger'
            onCancel={closeModal}
            onConfirm={async () => {
                setLoading(true, 'Deleting Project ...')
                try {
                    await deleteProject(project);
                    showToast('Project was deleted', 'danger')
                } catch (error) {
                    console.log(error.message);
                    showToast('Somthing went wrong', 'danger')
                }
                setLoading(false)
            }}
        />, { size: 'modal-sm' })
    }

    const getStatusColor = (status) => !status ? null : status === 'pending' ? 'warning' : status === 'active' ? 'primary' : status === 'completed' ? 'success' : null

    return (<NavbarLayout path="/projects" title={'Projects'} subtitle={'Manage your SaaS projects'}>
        <div className="row">

            {/* Filter */}
            <div className="col-12">

                <form onSubmit={handleSubmitFilters} className="row">

                    <div className="col-12 col-md-6 col-lg-3 mb-3">
                        <div className="input-group">
                            <div className="input-group-text"><i className="bi bi-search"></i></div>
                            <input
                                type="search" className="form-control" placeholder="Search Projects ..."
                                value={filter.query} onChange={(e) => setFilter({ ...filter, query: e.target.value })} />
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3 mb-3">
                        <div className="input-group">
                            <select
                                className="form-select"
                                value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
                                <option value="">Status</option>
                                <option value="pending">Pending</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3 col-xl-2 offset-xl-2 mb-3">
                        <button type="submit" className="btn btn-secondary w-100 text-truncate">Apply Filters</button>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3 col-xl-2 mb-3">
                        <button type="button" className="btn btn-primary w-100 text-truncate" onClick={handleAddProject}>
                            <i className="bi bi-plus-lg"></i> New Project
                        </button>
                    </div>
                </form>
            </div>

            <div className="col-12">
                <hr className="mt-0" />
            </div>

            {filtered.length <= 0 && <div className="text-muted text-center">No projects where added yet</div>}
            {filtered.map((project) => <div key={project.id} className="col-12 col-lg-6 col-xl-4 mb-3">
                <LazyItem>
                    <div className="project-card p-3">
                        <div className="d-flex justify-content-between  mb-3">
                            <div className="flex-grow-1 text-secondary">
                                {formatDate(project.createdAt)}
                            </div>

                            <div className="text-white">
                                <span className={`badge text-bg-${getStatusColor(project.status)} opacity-75`}>{project.status}</span>
                            </div>
                        </div>

                        <h5 className="fw-bold text-truncate" title={project.name}>{project.name}</h5>
                        <p className="text-secondary small mb-4 text-truncate-2" style={{ height: '40px' }}>{project.description}</p>

                        <div className="d-flex align-items-center justify-content-end gap-2 mt-auto">

                            <button
                                className="btn btn-outline-danger btn-sm px-3"
                                style={{ borderRadius: "6px" }}
                                onClick={() => handleDeleteProject(project)}
                            >Delete</button>

                            <button
                                className="btn btn-outline-secondary btn-sm px-3"
                                style={{ borderRadius: "6px" }}
                                onClick={() => handleUpdateProject(project)}
                            >Manage</button>
                        </div>
                    </div>
                </LazyItem>
            </div>)}
        </div>
    </NavbarLayout>);
}

export default Projects;