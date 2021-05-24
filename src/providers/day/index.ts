import base from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import calendar from 'dayjs/plugin/calendar';

base.extend(utc);
base.extend(timezone);
base.extend(calendar);

const dayjs = base;

export default dayjs;
