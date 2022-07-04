import axios from "axios";
import { useState } from "react";
import { publicRequest } from "../requestMethod";
import "./AddTable.css"
import { useNavigate } from "react-router-dom";

const AddTable=()=>{
    let navigate = useNavigate();
    const [values, setValues] = useState({
        ID:0,
        ProviderID: "1",
        PartnerID:9,
        BaseURL: "",
        FromName: "",
        Username: "",
        Password: "",
        VendorCode: "",
        ApiKey: "",
        SecretKey: "",
        AccountSID: "",
        AuthToken: "",
        Status:true
      });
      const token=localStorage.getItem('my-token');
      const inputs = [
        {
          id: "baseURL",
          name: "BaseURL",
          type: "text",
        },
        {
          id: "fromName",
          name: "FromName",
          type: "text",
        },
        {
            id: "username",
            name: "Username",
            type: "text",
          },
          {
            id: "password",
            name: "Password",
            type: "password",
          },
          {
            id: "vendorCode",
            name: "VendorCode",
            type: "text",
          },
          {
            id: "apiKey",
            name: "ApiKey",
            type: "text",
          },
          {
            id: "secretKey",
            name: "SecretKey",
            type: "text",
          },
          {
            id: "accountSID",
            name: "AccountSID",
            type: "text",
          },
          {
            id: "authToken",
            name: "AuthToken",
            type: "text",
          }]

        const handleChange = (event) => {
            setValues((prev) => {
              return { ...prev, [event.target.name]: event.target.value };
            });
          };

          const addNewProvider = async ()=>{
            try{
                const newProvide={...values};
                const res=await publicRequest.post(`/add-partner-sms-provider`, newProvide,{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('my-token')}` 
                      }
                }).then((response=>console.log(response)
                ));
            }catch(err){
                console.log(err);
            }} 
        
          const handleSubmit=(e)=>{
            e.preventDefault()
            addNewProvider();
            navigate("/", { replace: true });
          }
          
    return(
       <div className="add_table">
        <div className="adding_table">
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
                <select  onChange={handleChange} name="ProviderID" id="ProviderID" form="carform">
                <option value="1">PostaGuvercini</option>
                 <option value="2">MobilDev</option>
                 <option value="3">JetSMS</option>
                 <option value="4">MailJet</option>
                 <option value="5">Twilio</option>
                 <option value="6">InfoBip</option>
                 <option value="7">Vonage</option>
                </select>
                </span>
                
                <button>Save</button>
            </form>
        </div>
       </div>
    )
}

export default AddTable;