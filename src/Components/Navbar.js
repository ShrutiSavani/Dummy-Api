import { Link } from "react-router-dom";

const navbar = () => {
    return (
        <>
            <div className="container-fluid navbar-fluid mb-2 ">
                <nav className="navbar m-0 navbar-expand-lg bg-body-tertiary px-3">
                    <Link className="nav-link " to="/">Posts</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link" to="/users">Users</Link>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}
export default navbar;    