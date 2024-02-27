import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";



const Users = () => {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [users, setUsers] = useState([])


    useEffect(() => {
        async function apiFun() {
            setIsLoading(true)
            try {
                const responseUsers = await fetch("https://dummyjson.com/users");
                const usersRes = await responseUsers.json();
                setUsers(usersRes.users)

            } catch (e) {
                console.log('error fetching data : ', e)
                setIsError("oops!! error in fetching data.....")
            }
            setIsLoading(false);
        }
        apiFun()
    }, [])

    if (isLoading) {
        return (
            <span class="loader"></span>
        )
    }
    if (isError) {
        return (
            <span className="error-text text-danger fw-bold">{isError}</span>
        )
    }

    if (isLoading) {
        return (
            <div>Wait for Loading......</div>
        )
    }

    const navigatPage = (userid) => {
        navigate(`/users/${userid}`)
    }

    return (
        <>
            <div className="container-fluid page-container">
                <div className="container-fluid cards user-card p-0 "  >
                    {
                        users.map((user) => {
                            return (

                                <div className="card m-0 p-3 " onClick={() => { navigatPage(user.id) }} id="" >
                                    <div className="card-items d-flex flex-row">
                                        <img className="user-img user-img-part" src={user.image} alt=""></img>
                                        <div className="user-about">
                                            <div className="px-3">
                                                <p ><CiUser className="mb-1 me-1" />{user.firstName} {user.maidenName} {user.lastName}</p>
                                                <span className="fw-light"><BsTelephone className="mb-1 me-1" />{user.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div >
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
export default Users;    