import { Link } from "react-router-dom";


const navbar = () => {
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
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
                </div>
            </nav>

        </>
    )
}
export default navbar;