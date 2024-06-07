import PropTypes from "prop-types";
import '../styles/components_Styles/Issue_Modal.scss';
const Issue_Modal = ({description, setDescription, showModal}) => {
    const issueType = {
        1: 'Bugs',
        2: 'Log In',
        3: 'Players-Lab'
    }
    return (
        <>
            {showModal &&
                <section className='Modal_Body'>
                    <div className='Modal_Form'>
                        <label>Type Issue: </label>
                        <select>{Object.values(issueType).map(item => <option key={item}>{item}</option>)}</select>
                        <labe>Description:</labe>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div>
                        {/*<button onClick={sendRequest}>Send</button>*/}
                    </div>
                </section>
            }
        </>
    )
}
Issue_Modal.propTypes = {
    description: PropTypes.string,
    setDescription: PropTypes.func,
    cancelRequest: PropTypes.func,
    showModal: PropTypes.bool,
}

export default Issue_Modal;