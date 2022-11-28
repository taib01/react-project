import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css" ; 
import Agendas from "./Agenda";
import { useNavigate } from 'react-router-dom';
import "./AddAgenda.css";

function AddAgenda () {
    
    const [title, setTitle] = useState('') ; 
    const [description, setDescription] = useState('') ; 
    const [status, setStatus] = useState('') ; 
    const [date, setDate] = useState(null) ; 
    const [time, setTime] = useState(null) ; 
    const [error,setError]= useState(false);
    const [errorTime,setErrorTime]= useState(false);

    let history = useNavigate(); 

    const handleSubmit = (e)=>{
        e.preventDefault();

        //test at all field and validite of date 
        if ( title.length==0  ||  status.length==0 ||  date==null ||  time.length==null || date < getDate()) {
            setError(true);
            return ;     
        }

        //test at validité of time about if we have another work in the same time 
        for (let i = 0 ; i < Agendas.length ; i++){
            if (date == Agendas[i].date && time == Agendas[i].time){
                setErrorTime(true);
                return ;
            }
        }


        const id = Agendas.length + 1 ; 
        Agendas.push({id: id,title: title, description: description, status: status, date: date, time: time });
        history("/");
    }

    const getDate =()=>{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = String(today.getFullYear());
        let dateString ;
        //dateString = dd + '-' + mm + '-' + yyyy;
        dateString =  yyyy + '-' + mm + '-' + dd   ;
        return dateString;
    }


    return ( 
        <div className="Container my-5">
            <form className="w-80 card p-5 ">
                <div className="form-group text-center">
                    <h2>New Agenda</h2>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title"  placeholder="Enter Title" onChange={e => setTitle(e.target.value)}/>
                    <small id="emailHelp" className="form-text text-muted">Try to type signified title.</small>
                    {title.length<=0 && error == true?
                        <label> <small className="text-danger"> Title field is required</small> </label>
                        :<span></span>
                    }
                </div>
                <div className="form-group text-left">
                     <label htmlFor="description">Description</label>
                     <textarea className="form-control" id="description" rows="3" onChange={e => setDescription(e.target.value)}></textarea>
                </div>

                <div className="form-group text-left">
                    <label htmlFor="status">Status</label>
                    <select className="form-control" name="status" id="status" onChange={e => setStatus(e.target.value)}>
                        <option value=""></option>
                        <option value="Necessary">Necessary</option>
                        <option value="Necessary and urgent">Necessary and urgent</option>
                        <option value="Unnecessary and urgent">Unnecessary and urgent</option>
                        <option value="Unnecessary and not urgent">Unnecessary and not urgent</option>
                    </select>
                    {/* <input type="text" className="form-control" id="status"  placeholder="Enter Status" onChange={e => setStatus(e.target.value)}/> */}
                    {status.length<=0 && error == true?
                        <label> <small className="text-danger"> Status field is required</small> </label>
                        :<span></span>
                    }
                </div>
                <div className="form-group text-left">
                    <label htmlFor="date">Date</label>
                    <input type="date" min={getDate()} className="form-control" id="date"   placeholder="Enter Date" onChange={e => setDate(e.target.value)}/>
                    {(date==null || date<getDate() ) && error == true?
                        <label> <small className="text-danger"> Date field is required and cannot be less than current date</small> </label>
                    :   <span></span>
                    }
                </div>
                <div className="form-group text-left">
                    <label htmlFor="time">time</label>
                    <input type="time" className="form-control" id="time"  placeholder="Enter Time" onChange={e => setTime(e.target.value)} required/>
                    {time}
                    {time==null&& error == true?
                        <label> <small className="text-danger"> Time field is required  </small> </label>
                        :<span></span>
                    }
                    { errorTime == true?
                        <label> <small className="text-danger"> You have another work in this day in the same time  </small> </label>
                        :<span></span>
                    }
                </div>
                <div className="form-group text-left ">
                    <button type="submit" className="w-100 btn btn-primary" onClick={e => handleSubmit(e) }>Submit</button>
                </div>
            </form>
        </div>
    )
}
export default AddAgenda