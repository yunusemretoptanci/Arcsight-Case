import { publicRequest } from "../requestMethod";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Tables.css"
import { Link } from "react-router-dom";
const Tables = ()=>{
const [tables,setTables]=useState()
const[token,setToken]=useState("")
const[currentState,setCurrentState]=useState({
    id:"",
    stat:"true",
})

    const getToken= async()=>{
        try{
            const tokenFetch= await axios.post("http://c4f2.acsight.com:7710/connect/token", new URLSearchParams({
                grant_type : "password",
                client_id : "ClientIdWithFullAccess",
                client_secret : "fullAccessSecret",
                username: "test9@acsight.com",
                password: "123456O"
            }) ).then(function(response){
                localStorage.setItem('my-token', response.data.access_token);
                setToken(localStorage.getItem('my-token'));
                
            })  
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getToken();
    },[])

    const getTables = async ()=>{
        try{
            const res=await publicRequest.get(`/sms-provider-list`,{
                headers: {
                    'Authorization': `Bearer ${token}` 
                  }
            });
            setTables(res.data.data.partnerProviders);
        }catch(err){
        }} 

    useEffect(()=>{
        getTables()
    },[token])

    const postNewStat=async()=>{
        try{
            const newStat={...currentState}
            const res=await publicRequest.post(`/change-stat-partner-sms-provider`, new URLSearchParams(newStat),{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('my-token')}` 
                  }
            }).then((response=>console.log(response)
            ));
        }catch(err){
            console.log(err);
        }
        getTables();
       }

    const changeStat=(e)=>{
        var statu=""
        var ID=e.id;
        if(e.status==true){
            statu="false"
            setCurrentState({id:ID,stat:statu});
        }else{
            statu=true;setCurrentState({id:ID,stat:statu});
        }
    }

    useEffect(()=>{
    postNewStat();
    },[currentState])
    console.log(tables);
    

  const providers=["none","PostaGuvercini","MobilDev","JetSMS","MailJet","Twilio","InfoBip","Vonage"]
   
    
    return(
        <div className="tables-container">
        <Link to="/addprovider">
        <button style={{height:"50px",backgroundColor:"cyan"}}>ADD NEW PROVIDER</button>
        </Link>
        
        <div className="tables">
        {tables&&tables.map((table)=>(
            <div className="table">
            <div>
                <p>ProviderID: </p>
                <p>{providers[table.providerID]}</p>
            </div>
            <div>
                <p>BaseURL: </p>
                <p>{table.baseURL}</p>
            </div>
            <div>
                <p>From Name: </p>
                <p>{table.fromName}</p>
            </div>
            <div>
                <p>Username: </p>
                <p>{table.username}</p>
            </div>
            <div>
                <p>password: </p>
                <input className="table_password" type="password" value={table.password} readOnly></input>
            </div>
            <div>
                <p>VendorCode: </p>
                <p>{table.vendorCode}</p>
            </div>
            <div>
                <p>Api Key: </p>
                <p>{table.apiKey}</p>
            </div>
            <div>
                <p>Secret Key: </p>
                <p>{table.secretKey}</p>
            </div>
            <div>
                <p>Account SID: </p>
                <p>{table.accountSID}</p>
            </div>
            <div>
                <p>AuthToken: </p>
                <p>{table.authToken}</p>
            </div><div>
                <p>Updated When: </p>
                
                <p>{table.updatedWhen.slice(0,-6).replace("T"," ").replace("-",".")}</p>
            </div>
            <div>
                <p>Status: </p>
                <p>{table.status?"Active":"Passive"}</p>
            </div>
           
            {table.partnerID!=0&&<button onClick={()=>{changeStat(table);}}>SWITCH STATUS</button>}
            
            {table.partnerID!=0&&<Link to="/update" state={table}>
            <button>UPDATE</button>
            </Link>}
        </div>
        ))}
        </div>
        </div>
    )
}
export default Tables;