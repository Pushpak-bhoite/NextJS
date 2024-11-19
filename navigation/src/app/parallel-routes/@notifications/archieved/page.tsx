import Card from "@/app/components/Card";
import Link from "next/link";

export default function ArchievedNotification(){
    return <Card>
        <div>hi RevenuMetrics</div>
        <div><Link href={'/parallel-routes'}>Default Notification</Link></div>
    </Card>
}