import { useState} from "react";
import Issue_Modal from "../../components/Issue_Modal.jsx";

const User_Profile = () => {
    const [description, setDescription] = useState("");
    const [showModal, setShowModal] = useState(false);

    const setShow = () => setShowModal(!showModal);
    return (
        <>
            <section>
                <section>
                    <h1>Profile</h1>
                    <div>
                        {/*Avatar*/}
                        <h2>User Name</h2>
                    </div>
                </section>
                <footer>
                    <button onClick={setShow}>Report Issue</button>
                </footer>
            </section>
            <Issue_Modal description={description} setDescription={setDescription} showModal={showModal}/>
            {showModal && <button onClick={setShow}>Cancel</button>}

        </>
    )
}

export default User_Profile;
