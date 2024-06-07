import React, { useEffect, useState } from 'react'
import { db } from '../firebase.js'; // Adjust the path as needed
import { collection, getDocs } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCheckPoints, fetchData } from '../redux/EquipmentsSlice.js';
const Detail = () => {
    const dispach = useDispatch()
    const { id } = useParams()
    const statusEquip = useSelector(item=>item.statusEquip)
    
    const statusCheck = useSelector(item=>item.statusCheck)
    useEffect(()=>{
           
            dispach(fetchCheckPoints())
            dispach(fetchData())
            
    } , [dispach])

    const findEquipement = useSelector(item=>item.equipements.find(i=>i.id == id))
   
    const checkpoint = useSelector(data=>data.checkpoints.filter(i=>i.equipement_key == id))
   

  return (
    <>
    <center>  <h1> <u> Detail de l'équipement <span className='text-primary'>{findEquipement?.name}</span>  </u></h1> 
   </center> <br />
{ statusEquip == "Loading" ? <h2>Loading ....</h2>
:   <div className='container'>
       <div className="card mb-3 " style={{maxWidth : "800px"}}>
  <div className="row g-0">
    <div className="col-md-4">
      <img src={findEquipement ? findEquipement?.image  : ""} className="img-fluid rounded-start" alt="..." />
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h4> <u>Infos et Caractéristiques de l'équipement</u></h4>
        <h5 className="card-title">Nom : {findEquipement?.name}</h5>
        <h6 className="card-title">Nombre Faultes : {findEquipement?.nbFaults}</h6>
        <p className="card-text">local : {findEquipement?.local}</p>
        <p className="card-text">Model : {findEquipement?.model}</p>
        <p className="card-text">niveau : {findEquipement?.niveau}</p>
        <p className="card-text">Domain : {findEquipement?.domain}</p>
        <p className="card-text">Quantuty : {findEquipement?.quantity}</p>
        <p className="card-text">Building : {findEquipement?.building}</p>

        <p className="card-text"><small className="text-body-secondary">brand : {findEquipement.brand}</small></p>
      </div>
    </div>
  </div>
</div> 
</div>
}
{
    statusCheck == "Loading" ? <h2>Loading ...</h2> : 
    <>
    <center><h1>La liste des Point de Controle</h1></center>
    <table className="table container">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Faults</th>
      <th scope="col">recommendation</th>
      <th scope="col">Image</th>
    </tr>
  </thead>
  <tbody>
    {checkpoint.map((item,key)=>
     <tr key={key}>
      <th scope="row">{item.name}</th>
      <td>{item.fault}</td>
      <td>{item.recomendation}</td>
      <td><img src={item.image ? item.image  : ""}  /></td>
    </tr>
   )}
  </tbody>
</table>
</>
}

    </>
  )
}

export default Detail
