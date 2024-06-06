import {useContext} from "react";
import {Context} from "../store/AppContext.jsx";
import '../styles/components_Styles/PlayerCard.scss';
import {Link} from "react-router-dom";
const PlayerCard = ({getPlayerDataType, deletePlayer}) => {
    const {store} = useContext(Context)
    return(
        <>

            {store.players.map(({data, id}) =>
                (<>
                        <section className='Card_Player'>
                            { data &&
                                <div className='Specs'>
                                    <div className='Character_Type'>
                                        <img className={'Character'} src={getPlayerDataType(data.type)} alt='GIF ASEPRITE APLAUSE'/>
                                    </div>
                                    <div className='List'>
                                        <span className='First_Word_Type'>Name: </span> {data.name} <br/>
                                        <span className='First_Word_Type'> Type: </span> {data.type} <br/>
                                        <div className='Button_Card'>
                                            <button className='Delete_Player' onClick={() => deletePlayer(id)}>DELETE</button>
                                            <button className='Show_Info'>
                                                <Link to={`/player-info-${data.type}`} className='Link'>Info</Link>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </section>
                    </>
                )
            )}

        </>)

}

export default PlayerCard;