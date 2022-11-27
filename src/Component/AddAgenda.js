import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css" ; 
import Agendas from "./Agenda";
import { useNavigate } from 'react-router-dom';
import "./AddAgenda.css";

function AddAgenda () {
    
    const [title, setTitle] = useState('') ; 
    const [description, setDescription] = useState('') ; 
    const [status, setStatus] = useState('') ; 
    const [date, setDate] = useState('') ; 
    const [time, setTime] = useState('') ; 

    let history = useNavigate(); 

    const handleSubmit = (e)=>{
        e.preventDefault();
        const id = Agendas.length + 1 ; 
        Agendas.push({id: id,title: title, description: description, status: status, date: date, time: time });
        history("/");
    }


    return ( 
        <div className="Container my-5">
            <form className="w-80 card p-5 ">
                <div className="form-group text-left">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title"  placeholder="Enter Title" onChange={e => setTitle(e.target.value)}/>
                    <small id="emailHelp" className="form-text text-muted">Try to type signified title.</small>
                </div>
                <div className="form-group text-left">
                     <label htmlFor="description">Description</label>
                     <textarea className="form-control" id="description" rows="3" onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="status">Status</label>
                    <input type="text" className="form-control" id="status"  placeholder="Enter Status" onChange={e => setStatus(e.target.value)}/>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="date">Date</label>
                    <input type="date" className="form-control" id="date"  placeholder="Enter Date" onChange={e => setDate(e.target.value)}/>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="time">time</label>
                    <input type="text" className="form-control" id="time"  placeholder="Enter Time" onChange={e => setTime(e.target.value)}/>
                </div>
                <div className="form-group text-left ">
                    <button type="submit" className="w-100 btn btn-primary" onClick={e => handleSubmit(e) }>Submit</button>
                </div>
            </form>
        </div>
    )
}
export default AddAgenda