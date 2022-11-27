import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css" ; 
import Agendas from "./Agenda";
import { useNavigate } from 'react-router-dom';
import "./AddAgenda.css";

function EditAgenda () {
    
    const [id, setId] = useState(0) ; 
    const [title, setTitle] = useState("") ; 
    const [description, setDescription] = useState("") ; 
    const [status, setStatus] = useState("") ; 
    const [date, setDate] = useState("") ; 
    const [time, setTime] = useState("") ; 

    let history = useNavigate(); 

    const handleSubmit = (e)=>{
        e.preventDefault();
        
        Agendas[id-1] = {
        id : id ,
        title : title ,
        description : description  ,
        status : status ,
        date : date ,
        time : time 
        }  

        history("/");
    }

    useEffect( () => {
        setId(localStorage.getItem('Id'))
        setTitle(localStorage.getItem('Title'))
        setDescription(localStorage.getItem('Description'))
        setStatus(localStorage.getItem('Status'))
        setDate(localStorage.getItem('Date'))
        setTime(localStorage.getItem('Time'))
    },[])

    return ( 
        <div className="Container my-5">
            <form className="w-80 card p-5 ">
                <div className="form-group text-left">
                    <label htmlFor="title">Title</label>
                    <input type="text" value={title} className="form-control" id="title"   onChange={e => setTitle(e.target.value)}/>
                    <small id="emailHelp" className="form-text text-muted">Try to type signified title.</small>
                </div>
                <div className="form-group text-left">
                     <label htmlFor="description">Description</label>
                     <textarea className="form-control" id="description" rows="3" onChange={e => setDescription(e.target.value)} value={description}></textarea>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="status">Status</label>
                    <input type="text" value={status}  className="form-control" id="status"  onChange={e => setStatus(e.target.value)}/>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="date">Date</label>
                    <input type="text" value={date} className="form-control" id="date"   onChange={e => setDate(e.target.value)}/>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="time">time</label>
                    <input type="text" value={time} className="form-control" id="time"   onChange={e => setTime(e.target.value)}/>
                </div>
                <div className="form-group text-left ">
                    <button type="submit" className="w-100 btn btn-primary" onClick={(e)=> handleSubmit(e) }>Update</button>
                </div>
                
            </form>
        </div>
    )
}
export default EditAgenda ;