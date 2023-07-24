import { withAdminAuth } from "../HOC";

const Dashboard = () => {
  return <div className="bg-gray-50 h-full">Dashboard</div>;
};

export default withAdminAuth(Dashboard);
