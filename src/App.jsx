import React, { useEffect, useState } from 'react';
import { db } from './firebase.js'; // Adjust the path as needed
import { collection, getDocs } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './redux/EquipmentsSlice.js';
import { Link } from 'react-router-dom';

const App = () => {
  const dispach = useDispatch()
  const [val,setVal] = useState("")
  const t = "idriss"
  
   useEffect(()=>{
    dispach(fetchData())
   } , [dispach])

   const data = useSelector(data=>val?data.equipements.filter(i=>i.name.startsWith(val)
  ||i.domain.startsWith(val) || i.name.includes(val) || i.domain.includes(val) ) :data.equipements)
   const [filtred,setFiltred] = useState("")
  


  return (
    <>
    <center><h1>Tous les Equipements</h1></center>

    <br />
    <div className="input-group flex-nowrap container">
  <span className="input-group-text" id="addon-wrapping">Rechercher</span>
  <input type="text" className="form-control" onChange={e=>setVal(e.currentTarget.value)} placeholder="Filtrer Par Nom ou Domaine de l'équipement" aria-label="Username" aria-describedby="addon-wrapping" />
</div>
<br />
    <table className="table table-striped container">
  <thead>
    <tr>
      <th scope="col">Le nom de l'équipement</th>
      <th scope="col">Le domaine de l'équipement</th>
      <th scope="col">Le nombre de défauts associés</th>
      <th scope="col">La photo de l'équipement</th>
      <th scope='col'>Action</th>
    </tr>
  </thead>
  <tbody>
    { data.map((item,key)=>
  <tr key={key}>
  <th scope="row">{item?.name}</th>
  <td>{item?.domain}</td>
  <td>{item?.nbFaults}</td>
  <td><img src={item.photo ? item.photo : ""}  /></td>
  <td><Link to={'/details/'+item.id}>Details</Link></td>
</tr>)
    }
  
    
  </tbody>
</table>
</>
  );
};

export default App;
