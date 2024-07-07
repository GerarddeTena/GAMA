// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react"
import '../styles/components_Styles/Loader.scss';
import LoaderGIF from "../assets/Loader.gif";
export const Loader = () => {
    return (
        <>
           <section className='Loader_Container'>
               <img className='Loader' src={LoaderGIF} alt="Loader image"/>
           </section>
        </>
    )
}