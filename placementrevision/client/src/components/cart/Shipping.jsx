import React from 'react'
import "./shipping.css"
import HomeIcon from '@mui/icons-material/Home';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import PublicIcon from '@mui/icons-material/Public';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PinDropIcon from '@mui/icons-material/PinDrop';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import {Country,State,City} from "country-state-city"
import {useSelector,useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom"
import Checkoutsteps from "./Checkoutsteps.jsx"
import { saveshippinginfo } from '../../action/cartaction';

function Shipping() {
    const navigate = useNavigate();
     const dispatch = useDispatch();
     const {shippingInfo}=useSelector((state)=>state.cart);
     

    const [address,setaddress] = React.useState(shippingInfo?shippingInfo.address:"");
    const [city,setcity] = React.useState(shippingInfo?shippingInfo.city:"");
    const [state,setstate] = React.useState(shippingInfo?shippingInfo.state:"");
    const [country,setcountry] = React.useState(shippingInfo?shippingInfo.country:"");
    const [pincode,setpincode] = React.useState(shippingInfo?shippingInfo.pincode:"");
    const [phone,setphone] = React.useState(shippingInfo?shippingInfo.phone:"");


    const shippingsubmit=(e)=>{
        dispatch(saveshippinginfo({address,city,state,pincode,phone,country}));
        navigate("/order/confirm")
    }

  return (
    <>
    <Checkoutsteps activestep={0}/>
    <div className="shippingcontainer">
        <div className="shippingbox">
            <h2 className="shippingheading">Shipping Details</h2>
            <form className="shippingform"
            encType='multipart/form-data'
            onSubmit={shippingsubmit}>
                <div>
                    <HomeIcon/>
                    <input required type="text" placeholder="Address" value={address} onChange={(e)=>setaddress(e.target.value)} />
                </div>

                <div>
                    <LocationCityIcon/>
                    <input required type="text" placeholder="City" value={city} onChange={(e)=>setcity(e.target.value)} />
                </div>

                <div>
                    <PinDropIcon/>
                    <input required type="number" placeholder="Pincode" value={pincode} onChange={(e)=>setpincode(e.target.value)} />
                </div>

                <div>
                    <PhoneAndroidIcon/>
                    <input required type="number" placeholder="Phone" value={phone} onChange={(e)=>setphone(e.target.value)} />
                </div>

                <div>
                    <PublicIcon/>
                    <select required value={country} onChange={(e)=>setcountry(e.target.value)}>
                    <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
                  </select>
                </div>

                {country && (
                    <div>
                        <TransferWithinAStationIcon/>
                        <select required value={state} onChange={(e)=>setstate(e.target.value)}>
                    <option value="">State</option>
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
                  </select>
                    </div>
                )}


                <input type="submit" value="Continue" className="shippingbtn"/>


            </form>
        </div>
    </div>

    </>
  )
}

export default Shipping