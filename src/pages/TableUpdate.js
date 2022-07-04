import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { publicRequest } from '../requestMethod';
import "./TableUpdate.css"

const TableUpdate=()=>{
let navigate = useNavigate();
const location=useLocation()
const data=location.state;
const [values, setValues] = useState({
    ID:"",
    ProviderID: "",
    PartnerID:"",
    BaseURL: "",
    FromName: "",
    Username: "",
    Password: "",
    VendorCode: "",
    ApiKey: "",
    SecretKey: "",
    AccountSID: "",
    AuthToken: "",
  });
  const [updateStat,setUpdateStat]=useState({
    id:"",
    stat:"true",
  })

  useEffect(()=>{
    setValues((prev)=>{
        return{...prev,ID:data.id,ProviderID:data.providerID,PartnerID:data.partnerID,BaseURL:data.baseURL,
        FromName:data.fromName,Username:data.username,Password:data.password,VendorCode:data.vendorCode,ApiKey:data.apiKey,
    SecretKey:data.secretKey,AccountSID:data.accountSID,AuthToken:data.authToken}
    })

    setUpdateStat({
        id:data.id,
        stat:data.status
    })
  },[])

const inputs = [
    {
      id: "baseURL",
      name: "BaseURL",
      type: "text",
      defaultValue:data.baseURL?data.baseURL:""
    },
    {
      id: "fromName",
      name: "FromName",
      type: "text",
      defaultValue:data.fromName?data.fromName:""
    },
    {
        id: "username",
        name: "Username",
        type: "text",
        defaultValue:data.Username?data.Username:""
      },
      {
        id: "password",
        name: "Password",
        type: "password",
        defaultValue:data.Password?data.Password:""
      },
      {
        id: "vendorCode",
        name: "VendorCode",
        type: "text",
        defaultValue:data.vendorCode?data.vendorCode:""
      },
      {
        id: "apiKey",
        name: "ApiKey",
        type: "text",
        defaultValue:data.apiKey?data.apiKey:""
      },
      {
        id: "secretKey",
        name: "SecretKey",
        type: "text",
        defaultValue:data.secretKey?data.secretKey:""
      },
      {
        id: "accountSID",
        name: "AccountSID",
        type: "text",
        defaultValue:data.accountSID?data.accountSID:""
      },
      {
        id: "authToken",
        name: "AuthToken",
        type: "text",
        defaultValue:data.authToken?data.authToken:""
      }]

      const handleChange = (event) => {
        setValues((prev) => {
          return { ...prev, [event.target.name]: event.target.value };
        });
      };

      const statChange =(e)=>{
        var statu=true;
        if(e.target.value=="true"){
            statu=true;
        }else{
            statu="false";
        }
        setUpdateStat(() => {
            return { id:values.ID, stat:statu };
          });
      }

      const updateProvider = async ()=>{
        try{
            const updatedProvide={...values};
            const res=await publicRequest.post(`/update-partner-sms-provider`, updatedProvide,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('my-token')}` 
                  }
            }).then((response=>console.log(response)
            ));
        }catch(err){
            console.log(err);
        }}

        const updateStats=async ()=>{
            try{
                const currentStat={...updateStat}
                const res=await publicRequest.post(`/change-stat-partner-sms-provider`, new URLSearchParams(currentStat),{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('my-token')}` 
                      }
                }).then((response=>console.log(response)
                ));
            }catch(err){
                console.log(err);
            }
        }

      const handleSubmit =(e)=>{
        e.preventDefault();
        updateStats();
        updateProvider();
        navigate("/");
      }

      
      
    return(
        <div className='table_update'>
             <form onSubmit={handleSubmit}>
            {inputs.map((input)=>(
                <span>
                <label for={input.id}>{input.name}</label>
                    <input
                    {...input}
                    onChange={handleChange}
                     ></input>
                     </span>
                ))}
                <span>
                <label for="ProviderID">ProviderID:</label>
                <select  onChange={handleChange} name="ProviderID" id="ProviderID" form="providerform">
                <option selected={values.ProviderID=="1"&&"selected"} value="1">PostaGuvercini</option>
                 <option selected={values.ProviderID=="2"&&"selected"} value="2">MobilDev</option>
                 <option selected={values.ProviderID=="3"&&"selected"} value="3">JetSMS</option>
                 <option  selected={values.ProviderID=="4"&&"selected"}value="4">MailJet</option>
                 <option selected={values.ProviderID=="5"&&"selected"} value="5">Twilio</option>
                 <option selected={values.ProviderID=="6"&&"selected"} value="6">InfoBip</option>
                 <option selected={values.ProviderID=="7"&&"selected"} value="7">Vonage</option>
                </select>
                </span>

                <span>
                <label for="Status">Status:</label>
                <select  onChange={statChange} name="stat" id="status" form="statusform">
                <option selected={updateStat.stat==true&&"selected"} value="true">Active</option>
                <option selected={updateStat.stat==false&&"selected"} value="false">Passive</option>
                </select>
                </span>

                <button>Update</button>
            </form>
        </div>
    )
}

export default TableUpdate;