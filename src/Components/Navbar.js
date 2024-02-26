import { Link } from "react-router-dom";


const navbar = () => {
    return (
        <>
            <div class="container-fluid">
                <nav class="navbar px-3 navbar-expand-lg bg-body-tertiary">
                    {/* <a class="navbar-brand" href="#">Navbar</a> */}
                    <Link className="nav-link active" to="/">Posts</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <Link className="nav-link" to="/users">Users</Link>
                        </div>
                    </div>
                </nav>
            </div>

        </>
    )
}
export default navbar;