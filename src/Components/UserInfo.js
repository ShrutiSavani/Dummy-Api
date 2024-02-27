import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { MdConnectWithoutContact } from "react-icons/md";
import { CiBank } from "react-icons/ci";
import { CgOrganisation } from "react-icons/cg";

const UserInfo = () => {
    const navigate = useNavigate()


    const { userid } = useParams()
    // console.log(postid) //2

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function apiFun() {
            setIsLoading(true)

            try {

                const responseUser = await fetch(`https://dummyjson.com/users/${userid}`);
                let usersRes = await responseUser.json();

                setUsers(usersRes)
            } catch (e) {
                console.log('error fetching data : ', e)
                setIsError("oops!! error in fetching data.....")
            }
            setIsLoading(false);
        }
        apiFun()
    }, [userid])

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
                            <button className="btn " onClick={() => { navigate(-1) }}>Back</button>
                        </div>

                        <div className=" abcd d-flex">
                            <img className="user-info-img user-img-part" src={users.image} alt=""></img>
                            <div className="conatiner-fluid mx-4">

                                <div className="user-detail">
                                    <div className="row fs-4">

                                        <image src="https://www.flaticon.com/free-icon/user_552721" />
                                        <p><span className="detail-heading">Name : </span>{users.firstName} {users.maidenName} {users.lastName}</p>
                                    </div>


                                    <div className="user-bio-contact my-3 row gap-3">
                                        <div className="user-bio col ">
                                            <p className="text-center mb-1 fw-bold fs-5"><CiUser className="mb-1 me-1" />Bio  </p>
                                            <p><span className="detail-heading">Birth Date : </span>{users.birthDate}</p>
                                            <p><span className="detail-heading">Age : </span>{users.age}</p>
                                            <p><span className="detail-heading">Gender : </span>{users.gender}</p>
                                            <p><span className="detail-heading">Education : </span>{users.university}</p>
                                            <p><span className="detail-heading">BloodGroup : </span>{users.bloodGroup}</p>
                                            <p><span className="detail-heading">Height : </span>{users.height}</p>
                                            <p><span className="detail-heading">weight : </span>{users.weight}</p>
                                            <p><span className="detail-heading">Eye-color : </span>{users.eyeColor}</p>
                                            {users.address && (
                                                <p><span className="detail-heading">Hair : </span>{users.hair.color} {users.hair.color}</p>
                                            )}
                                        </div>
                                        <div className="user-contact col">
                                            <p className="text-center mb-1 fw-bold fs-5"><MdConnectWithoutContact className="me-1" />contact </p>
                                            <p><span className="detail-heading">Phone No. : </span>{users.phone}</p>
                                            <p><span className="detail-heading">Email : </span>{users.email}</p>
                                            <p><span className="detail-heading">UserName : </span>{users.username}</p>
                                            <p><span className="detail-heading">Password : </span>{users.password}</p>
                                            <p><span className="detail-heading">macAddress : </span>{users.macAddress}</p>
                                            {users.address && (

                                                <p><span className="detail-heading">address : </span>{users.address.address}, {users.address.city}, {users.address.state}, {users.address.postalCode}.</p>
                                            )}
                                        </div>

                                    </div>


                                    <div className="user-bank-company row gap-3">
                                        <div className="user-bank-details col">
                                            <p className="text-center mb-1 fw-bold fs-5"><CiBank className="mb-1 me-1" />Bank Detail </p>
                                            {users.bank && (
                                                <div>
                                                    <p><span className="detail-heading">CardExp Date : </span>{users.bank.cardExpire}</p>
                                                    <p><span className="detail-heading">CardNumber : </span>{users.bank.cardNumber}</p>
                                                    <p><span className="detail-heading">CardType : </span>{users.bank.cardType}</p>
                                                    <p><span className="detail-heading">Currency : </span>{users.bank.currency}</p>
                                                    <p><span className="detail-heading">Iban : </span>{users.bank.iban}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="user-company-details col">
                                            <p className="text-center mb-1 fw-bold fs-5"><CgOrganisation className="me-1" />Company Detail </p>
                                            {users.address && (
                                                <div>
                                                    <p><span className="detail-heading">Address : </span>{users.address.address}, {users.address.city}, {users.address.state}, {users.address.postalCode},</p>
                                                    <p><span className="detail-heading">Department : </span>{users.company.department}</p>
                                                    <p><span className="detail-heading">Name : </span>{users.company.name}</p>
                                                    <p><span className="detail-heading">Title : </span>{users.company.title}</p>
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