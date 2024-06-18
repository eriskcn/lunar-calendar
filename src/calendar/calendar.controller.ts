import { Controller, Get, Post, Body } from '@nestjs/common';
import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
    constructor(private readonly calendarService: CalendarService) { }
    @Get()
    getToday() {
        return this.calendarService.getToday();
    }

    @Post('solar2lunar')
    convertSolar2Lunar(@Body() body: { day: number, month: number, year: number }) {
        return this.calendarService.convertSolar2Lunar(body);
    }

    @Get('check')
    handleCron() {
        return this.calendarService.handleCron();
    }
}
