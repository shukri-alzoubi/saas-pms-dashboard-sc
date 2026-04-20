import { useEffect, useMemo } from "react";
import Header from "../components/layout/Header";
import NavbarLayout from "../components/layout/Navbar";
import ProjectModal from "../components/modals/Project.modal";
import { useAuth } from "../context/AuthContext";
import { useNotifier } from "../context/NotifierContext";
import { useProjects } from "../hooks/useProjects";
import { formatDate } from "../utils/helper";
import { Link } from "react-router-dom";

const Dashboard = () => {

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

    useEffect(() => {
        setLoading(isProjectLoading, isProjectLoading ? 'Loading Data ...' : null)
    }, [isProjectLoading]);

    const summary = useMemo(() => {
        let activeProjects = [];
        let pendingProjects = [];
        let completedProjects = [];

        projects.forEach((p) => {
            if (p.status === 'active') activeProjects.push(p);
            if (p.status === 'pending') pendingProjects.push(p);
            if (p.status === 'completed') completedProjects.push(p);
        });

        return { activeProjects, pendingProjects, completedProjects }

    })

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

    return (<NavbarLayout path="/" title={'Dashboard'} subtitle={'Welcome back, manage your projects efficiently.'}>

        <div className="row">

            <div className="col-12 text-end mb-3">
                <button className="btn btn-primary px-4" onClick={handleAddProject}>
                     <i className="bi bi-plus-lg"></i> New Project
                </button>
            </div>

            <div className="col-12 col-md-6 col-lg-3 mb-3">
                <div className="card">
                    <span className="text-light small fw-bold">Total Projects</span>
                    <h2 className="text-white fw-bold mt-2 mb-0">{projects.length}</h2>
                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3 mb-3">
                <div className="card">
                    <span className="text-light small fw-bold">Active Projects</span>
                    <h2 className="text-white fw-bold mt-2 mb-0">{summary.activeProjects.length}</h2>
                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3 mb-3">
                <div className="card text-bg-success">
                    <span className="text-light small fw-bold">Completed Projects</span>
                    <h2 className="text-white fw-bold mt-2 mb-0">{summary.completedProjects.length}</h2>
                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3 mb-3">
                <div className="card h-100">
                    <span className="text-light small fw-bold">Last Created</span>
                    <div className="text-muted  mt-2 mb-0">{projects[0]?.name ?? ''}</div>
                    <div className="text-muted small mb-0">{projects[0]?.createdAt ? formatDate(projects[0]?.createdAt) ?? '' : ''}</div>
                </div>
            </div>

            <div className="col-12 col-lg-7 mb-3">
                <div className="card">
                    <div className="card-title mb-3">
                        Recently Added
                    </div>
                    <div>
                        <ul className="list-group list-group-flush">
                            {Array.from({ length: 5 }).map((n, index) => {
                                const project = projects[index]
                                if (!project) return <span key={index}></span>

                                return <li key={index} className="list-group-item">
                                    <div className="d-flex align-items-center gap-3">
                                        <div>
                                            <div className="project-icon-box text-primary" style={{ background: "rgba(11, 85, 245, 0.1)" }}>
                                                <i className="bi bi-folder"></i>
                                            </div>
                                        </div>

                                        <div className="flex-grow-1 text-truncate">
                                            <div className="fs-6 text-truncate">{project.name}</div>
                                            <p className="text-muted text-truncate small p-0 m-0">{project.description}</p>
                                        </div>

                                        <div>
                                            <Link className="link-primary" onClick={() => handleUpdateProject(project)}>Open</Link>
                                        </div>
                                    </div>
                                </li>
                            }
                            )}

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </NavbarLayout>);
}

export default Dashboard;