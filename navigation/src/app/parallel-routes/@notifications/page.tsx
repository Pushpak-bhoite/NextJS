import Card from "@/app/components/Card";
import Link from "next/link";

export default function Notification(){
    return <Card>
        <div>hi RevenuMetrics</div>
        <div><Link href={'/parallel-routes/archieved'}>Archieved Notification</Link></div>
    </Card>
}