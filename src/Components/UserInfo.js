import { Link, useParams } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { MdConnectWithoutContact } from "react-icons/md";
import { CiBank } from "react-icons/ci";
import { CgOrganisation } from "react-icons/cg";
import { getUserById } from "../services/users.service";
import useFetchData from "../Hooks/useFetchData";

const UserInfo = () => {
    const { userid } = useParams()
    const { loading: isLoading, error: isError, data: user } = useFetchData(getUserById, userid)

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

    return (
        <>
            <div className="container-fluid cards" >
                <div className="card user-detail-card p-3">
                    <div className="card-items">

                        <div className="d-flex">
                            <p className="user-id">User ID : {userid}</p>
                            <Link to='/users'><button className="btn ">Back</button></Link>
                        </div>

                        <div className=" abcd d-flex">
                            <img className="user-info-img user-img-part" src={user.image} alt=""></img>
                            <div className="conatiner-fluid mx-4">

                                <div className="user-detail">
                                    <div className="row fs-4">
                                        <image src="https://www.flaticon.com/free-icon/user_552721" />
                                        <p><span className="detail-heading">Name : </span>{user.firstName} {user.maidenName} {user.lastName}</p>
                                    </div>

                                    <div className="user-bio-contact my-3 row gap-3">

                                        <div className="user-bio col ">
                                            <p className="text-center mb-1 fw-bold fs-5"><CiUser className="mb-1 me-1" />Bio  </p>
                                            <p><span className="detail-heading">Birth Date : </span>{user.birthDate}</p>
                                            <p><span className="detail-heading">Age : </span>{user.age}</p>
                                            <p><span className="detail-heading">Gender : </span>{user.gender}</p>
                                            <p><span className="detail-heading">Education : </span>{user.university}</p>
                                            <p><span className="detail-heading">BloodGroup : </span>{user.bloodGroup}</p>
                                            <p><span className="detail-heading">Height : </span>{user.height}</p>
                                            <p><span className="detail-heading">weight : </span>{user.weight}</p>
                                            <p><span className="detail-heading">Eye-color : </span>{user.eyeColor}</p>

                                            {user.address && (
                                                <p><span className="detail-heading">Hair : </span>{user.hair.color} {user.hair.color}</p>
                                            )}

                                        </div>

                                        <div className="user-contact col">
                                            <p className="text-center mb-1 fw-bold fs-5"><MdConnectWithoutContact className="me-1" />contact </p>
                                            <p><span className="detail-heading">Phone No. : </span>{user.phone}</p>
                                            <p><span className="detail-heading">Email : </span>{user.email}</p>
                                            <p><span className="detail-heading">UserName : </span>{user.username}</p>
                                            <p><span className="detail-heading">Password : </span>{user.password}</p>
                                            <p><span className="detail-heading">macAddress : </span>{user.macAddress}</p>

                                            {user.address && (
                                                <p><span className="detail-heading">address : </span>{user.address.address}, {user.address.city}, {user.address.state}, {user.address.postalCode}.</p>
                                            )}

                                        </div>

                                    </div>


                                    <div className="user-bank-company row gap-3">

                                        <div className="user-bank-details col">
                                            <p className="text-center mb-1 fw-bold fs-5"><CiBank className="mb-1 me-1" />Bank Detail </p>

                                            {user.bank && (
                                                <div>
                                                    <p><span className="detail-heading">CardExp Date : </span>{user.bank.cardExpire}</p>
                                                    <p><span className="detail-heading">CardNumber : </span>{user.bank.cardNumber}</p>
                                                    <p><span className="detail-heading">CardType : </span>{user.bank.cardType}</p>
                                                    <p><span className="detail-heading">Currency : </span>{user.bank.currency}</p>
                                                    <p><span className="detail-heading">Iban : </span>{user.bank.iban}</p>
                                                </div>
                                            )}

                                        </div>

                                        <div className="user-company-details col">
                                            <p className="text-center mb-1 fw-bold fs-5"><CgOrganisation className="me-1" />Company Detail </p>

                                            {user.address && (
                                                <div>
                                                    <p><span className="detail-heading">Address : </span>{user.address.address}, {user.address.city}, {user.address.state}, {user.address.postalCode},</p>
                                                    <p><span className="detail-heading">Department : </span>{user.company.department}</p>
                                                    <p><span className="detail-heading">Name : </span>{user.company.name}</p>
                                                    <p><span className="detail-heading">Title : </span>{user.company.title}</p>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>


                </div>
            </div>





        </>

    )
}
export default UserInfo;