// import '../../App.css'
import Select from "react-select";
import {React, useState} from 'react'
import { post } from "jquery";
const Home =() => {
    let numberOfSeatsArray = [1, 2, 3, 4, 5, 6, 7]
    const [numberOfSeats, setSeats] = useState(0)
    const [ticketsNotAvailable, setTicketsNotAvailable] = useState(false)
    const [ticketsBooked, setTicketBooked] = useState([])
    const [error, setError] = useState(false)
    const url = "URL"
    const bookTickets=(e)=>{
        post(`http://localhost:6000/tickets/${numberOfSeats}`)
        console.log(numberOfSeats)
        fetch(
            url
          )
            .then((res) => {
                if(res.status === 200){
                  return res.json()
                }else if(res.status === 201){
                  return {bookedTickets: [0]}
                }else{
                    return {bookedTickets: [-1]}
                }
          })
            .then((data) => {
              if(data.bookedTickets[0] !== 0 || data.bookedTickets[0] !==-1 ){
                  setTicketBooked(data.bookedTickets)
              }else if(data.bookedTickets[0] === 0){
                setTicketsNotAvailable(true)
              }
              else{
                setError(true)
              }
            });
            
    }
    const Result = () =>{
        return(<div className="result">
            <ul>
            {ticketsBooked.map((item)=>{
                return<li>{item}</li>
            })}
            </ul>
        </div>)
        
    }
    const NotAvailable = () =>{
        return (<div className="notAvailble">
            <h1>Sorry Tickets Are Not Available</h1>
        </div>)
    }
    return (
        <div className="container mainContainer">
            <br />
            <h1 className="text-center color-white" style={{pendingTop: "30%"}}>
                Book Tickets Now!
            </h1>
            <br /><br /><br /><br />
            <Select
                      className="select"
                      placeholder="Select Number of Tickets"

                    options={numberOfSeatsArray.map((item)=>({
                        value: item,
                        label: item,
                    }))}
                      onChange={(e) => {
                        //   console.log(e.value)
                        var numberOfSeats = e.value
                        setSeats(numberOfSeats)
                      }}
                    />
            <br /><br />
            <button type="submit" id= "bookTicketButton" className="btn btn-info" disabled = {numberOfSeats===0?true:false} onClick={bookTickets}>Book Tickets</button>
           {ticketsNotAvailable?<NotAvailable />:<Result />}
           {error?alert("Something Went Wrong"): null}
        </div>
    )
}
export default Home;