import Sidebar from "../components/layout/Sidebar";
import PodcastPanel from "../components/dashboard/PodcastPanel";
import SecondaryNavbar from "../components/layout/SecondaryNavbar";

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      <SecondaryNavbar />
      <div className="dashboard-content">
        <Sidebar />
        <div className="dashboard-main">
          <PodcastPanel />
        </div>
      </div>
    </div>
  );
};


export default Dashboard;