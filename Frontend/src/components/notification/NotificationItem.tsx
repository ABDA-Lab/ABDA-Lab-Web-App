import { Bell, FileText } from 'lucide-react';

type NotificationType = 'system' | 'project' | 'message';

interface NotificationItemProps {
    id: number;
    type: NotificationType;
    title: string;
    message: string;
    date: string;
    read: boolean;
}

export default function NotificationItem({ id, type, title, message, date, read }: NotificationItemProps) {
    // Function to format notification time
    const formatNotificationTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getNotificationIcon = (type: NotificationType) => {
        switch (type) {
            case 'system':
                return <Bell className="h-5 w-5 text-blue-500" />;
            case 'project':
                return <FileText className="h-5 w-5 text-green-500" />;
            case 'message':
                return <Bell className="h-5 w-5 text-purple-500" />;
            default:
                return <Bell className="h-5 w-5 text-gray-500" />;
        }
    };

    return (
        <div className={`p-4 border rounded-lg transition-colors ${read ? 'bg-white' : 'bg-blue-50'}`}>
            <div className="flex">
                <div className="mr-4 mt-1">{getNotificationIcon(type)}</div>
                <div className="flex-1">
                    <div className="flex justify-between">
                        <h3 className="font-medium">{title}</h3>
                        <span className="text-xs text-gray-500">{formatNotificationTime(date)}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{message}</p>
                </div>
            </div>
        </div>
    );
}
