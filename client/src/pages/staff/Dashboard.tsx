import "./Dashboard.css"
import { SettingsIcon } from '../../components/ui/icons/SettingsIcon';
import { ProfileIcon } from '../../components/ui/icons/ProfileIcon';
import { QrCodeIcon } from "../../components/ui/icons/QrCodeIcon";
import { BellIcon } from "../../components/ui/icons/BellIcon";
import { useNavigate } from "react-router-dom";

export const Dashboard = () =>{

const navigate = useNavigate()

    return(
        <div className="main-container">

            <div className="header">
                <h2>ZooControl Dashboard</h2>

                <div className="icons">
                    <button className="icon-btns" onClick={() => navigate('/dashboard/settings')} >
                    <SettingsIcon size={30} />
                    </button>
                    <button className="icon-btns" onClick={() => navigate('/dashboard/profile')} >
                    <ProfileIcon size={30} />
                    </button>
                </div>        

            </div>

            <div className="stat-container">
                <div className="stat-visitor">
                    <div className="stat-title">
                    <ProfileIcon size={35} />
                    <h3>Visitor statistics</h3>
                    </div>
                    <button className="stat-visitor-btn">View</button> 
                </div>

                <div className="stat-exhibit">
                    <div className="stat-title">
                    <QrCodeIcon size={35} />
                    <h3>Exhibit statistics</h3>
                    </div>
                    <button className="stat-exhibit-btn">View</button> 
                </div>                
            </div>

            <div className="map-container">
                Map TBD (no websockets yet)
            </div>

            <div className="notif-container">
                <div className="notif-icon">
                    <BellIcon size={43}/>
                </div>
                    <div className="notif-text">
                    <h2>Notify visitors about an upcoming event!</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a  fringilla erat, sed convallis ligula. Vestibulum ullamcorper nibh id  mauris sollicitudin.</p>
                    </div>
                <button className="notif-btn">Manage Event</button>
            </div>

                <h2>Dashboard Overview</h2>

            
        </div>
    )

}