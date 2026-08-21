export default function StatCard({ label, value, change, icon }: { label: string; value: string; change: string; icon: string }) {
  return <div className="statCard">
    <div className="statTop"><span>{label}</span><b>{icon}</b></div>
    <strong className="statValue">{value}</strong>
    <span className="positive">{change}</span>
  </div>;
}
