// import fetch from "node-fetch";

import { useEffect, useState } from "react";
import Navbar from "./Navbar"
console.log("reder navbar")
const Posts = () => {

    let data;

    // fetch('https://dummyjson.com/posts')
    //     .then(res => res.json())
    //     .then(console.log);

    const [users, setUsers] = useState([])

    async function apiFun() {
        try {
            const response = await fetch("https://dummyjson.com/posts");
            data = await response.json();
            console.log(data)
            console.log(data.posts[0].title)
            console.log(data.posts.length)
            if (data.posts.length > 0) {
                setUsers(data.posts)
            }
        } catch (e) {
            console.log('error fetching data : ', e)
        }

    }
    useEffect(() => {
        apiFun()
    }, [])
    console.log(users)


    return (

        <>
            <Navbar />

            {
                users.map((ele, i) => {
                    return (
                        <>
                            {/* <p>{ele.id}</p> */}
                            <div className="container-fluid">
                                <div class="accordion" id="accordionExample">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                <div>
                                                    <h6>{ele.title}</h6>
                                                    <h6>{ele.body}</h6>
                                                    <hr></hr>
                                                </div>
                                            </button>
                                        </h2>
                                        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </>
                    )
                })
            }


        </>
    )
}
export default Posts