import { Injectable, Logger } from '@nestjs/common';
import { LunarDate } from 'vietnamese-lunar-calendar';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { format, addDays } from 'date-fns';

@Injectable()
export class CalendarService {
    private readonly logger = new Logger(CalendarService.name)
    async getToday() {
        const lunarDate = new LunarDate();
        return lunarDate;
    }

    async convertSolar2Lunar({ day, month, year }: { day: number, month: number, year: number }) {
        const lunarDate = new LunarDate(year, month, day);
        return lunarDate;
    }

    @Cron(CronExpression.EVERY_DAY_AT_7AM)
    async handleCron() {
        const today = new Date();
        const futureDate = addDays(today, 7);
        const requestBody = {
            day: futureDate.getDate(),
            month: futureDate.getMonth() + 1,
            year: futureDate.getFullYear(),
        };

        try {
            this.logger.debug(`Sending POST request with body: ${JSON.stringify(requestBody)}`);
            const response = await axios.post('http://localhost:3000/calendar/solar2lunar', requestBody);
            const data = response.data;
            if (data.holiday) {
                this.logger.log(`7 days left until the day ${data.holiday}`);
            } else {
                this.logger.log('No holiday found in the response');
            }
            return data;
        } catch (error) {
            this.logger.error(`Failed to send request: ${error.message}`);
        }
    }
}

