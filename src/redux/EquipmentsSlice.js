import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from '../firebase.js'; // Adjust the path as needed
import { collection, getDocs } from 'firebase/firestore';

//Fetch Equipements
const Equipements = collection(db,"Equipments")

export const fetchData = createAsyncThunk("fetch/data",
async ()=>{
    const values = await getDocs(Equipements)
    const filtredData =  values.docs.map(doc=>({...doc.data(),id:doc.id }))
    const sorted = filtredData.sort((a,b) => a.name.localeCompare(b.name))
    return sorted;
}
)

// Fetch CheckPoints
const Checkpoints = collection(db,"Checkpoints")

export const fetchCheckPoints = createAsyncThunk("fetch/checkpoints" , 
    async()=>{
        const values = await getDocs(Checkpoints)
        const filtredData = values.docs.map(doc=>({...doc.data(),id:doc.id }))
        return filtredData
    }
)


const EquipmentsSlice = createSlice({
    name:"equipments",
    initialState : {
        equipements : [],
        checkpoints : [],
        selectedEquipement : {},
        statusEquip : "Loading",
        statusCheck : "Loading"
    },
    reducers : {
        ajouter(state,action){

        }
    },
    extraReducers : builder=>{
        builder.addCase(fetchData.pending , (state)=>{
            state.statusEquip = "Loading"
        })
        builder.addCase(fetchData.fulfilled,(state,action)=>{
            state.equipements = action.payload
            state.statusEquip = "Success"
        })
        builder.addCase(fetchCheckPoints.fulfilled,  (state,action)=>{
            state.checkpoints = action.payload
            state.statusCheck = "Success"
        })
        builder.addCase(fetchCheckPoints.pending , (state)=>{
            state.statusEquip = "Loading"
        })
    }
})
export default EquipmentsSlice.reducer
export const {ajouter} = EquipmentsSlice.actions