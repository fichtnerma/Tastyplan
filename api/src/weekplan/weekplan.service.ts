import { Injectable } from '@nestjs/common';

@Injectable()
export class WeekplanService {
    getWeekPlan() {
        //Take the Preferences from the DB
        //Get a subset of recipes based on these conditions(logic for weekplan generation)
        //generate a weekplan amd store it in DB
        //send the weekplan back to the frontend
        return '';
    }
}
