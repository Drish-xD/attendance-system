import { Card } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip';
import { Check, Clock, File, X } from 'react-feather';

const statusData = {
  labels: ['Absent', 'Present', 'Leave'],
  colors: ['danger', 'success', 'warning'],
  icons: [<X key={0} size={18} />, <Check key={1} size={18} />, <File key={2} size={15} />]
};

const AttendanceCard = ({ date, status }: { date: Date; status: number }) => {
  return (
    <Card shadow="md" className="max-w-sm max-h-20 p-5 bg-background/50">
      <div className="flex flex-nowrap justify-between gap-5">
        <Chip startContent={<Clock />} variant="light" className="whitespace-nowrap">
          {date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Chip>
        <span>
          <Chip
            startContent={statusData.icons[status]}
            size="sm"
            variant="faded"
            color={statusData.colors[status] as 'danger' | 'success' | 'warning'}
          >
            {statusData.labels[status]}
          </Chip>
        </span>
      </div>
    </Card>
  );
};

export default AttendanceCard;
