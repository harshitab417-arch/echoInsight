import Sidebar from "../components/layout/Sidebar";
import PodcastPanel from "../components/dashboard/PodcastPanel";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <PodcastPanel />
    </div>
  );
};

export default Dashboard;