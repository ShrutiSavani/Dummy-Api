import { useNavigate } from "react-router-dom";
import { getAllUser } from "../services/users.service";
import { CiUser } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import useFetchData from "../Hooks/useFetchData";

const Users = () => {
  const navigate = useNavigate()
  const { loading: isLoading, error: isError, data: users } = useFetchData(getAllUser)

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
                        <p>{user.firstName} {user.maidenName} {user.lastName}</p>
                        <span className="fw-light user-email">{user.email}</span>
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