// import {useContext, useEffect, useState} from "react";
// import {Context} from "../../store/GENERAL_CONTEXT/AppContext.jsx";
// import '../../styles/views_Styles/PlayerLab.scss';
// import muscular from '../../Images/typesOfCharacter/Human_Thin.gif';
// import cyborg from '../../Images/typesOfCharacter/Cyborg.gif';
// import reptilian from '../../Images/typesOfCharacter/Reptile.gif';
// import PlayerCard from "../../components/Cards/PlayerCard.jsx";
// import '../../styles/components_Styles/Cards/PlayerCard.scss';
// export const PlayerLab = () => {
//
//     const {actions} = useContext(Context);
//
//     const [name, setName] = useState('');
//     const [type, setType] = useState('Human');
//     const typeOptions = ['Human', 'Reptile', 'Cyborg'];
//     const getPlayerDataType = (playerType) =>{
//         if(playerType === 'Muscular'){
//             return muscular;
//         }
//         if(playerType === 'Reptile'){
//             return reptilian;
//         }
//         if(playerType === 'Cyborg'){
//             return cyborg;
//         }
//         return muscular;
//     }
//
//     const SubmitPlayer = async (e) => {
//         e.preventDefault();
//         const playerData = {
//             name,
//             type
//         }
//         await actions.setPlayersDispatcher(playerData);
//         await actions.getPlayersDispatcher();
//     }
//     const deletePlayer = async (id) => {
//         await actions.deletePlayersDispatcher(id);
//     }
//
//     return (
//         <>
//             {/*<ImageSlogan/>*/}
//             <section className='Craft_Player'>
//                 <div className='Form'>
//                     <label>Name: </label>
//                     <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
//                     <label>Type: </label>
//                     <select value={type} onChange={(e) => {
//                         e.preventDefault();
//                         setType(e.target.value);
//                     }}>
//                         {typeOptions.map((option, index) => (
//                             <option key={index} value={option}>
//                                 {option}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </section>
//             <button className='Create_Player' onClick={SubmitPlayer}>Create</button>
//             <section className='RenderedPlayerCrafted'>
//                 <PlayerCard deletePlayer={deletePlayer} getPlayerDataType={getPlayerDataType}/>
//             </section>
//         </>
//     )
// }
//
