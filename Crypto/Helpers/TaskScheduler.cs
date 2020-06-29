using System;
using System.Collections.Generic;
using System.Threading;

namespace Crypto.Helpers
{
    public class TaskScheduler
    {
        private static TaskScheduler _instance;
        private List<Timer> timers = new List<Timer>();

        private TaskScheduler() { }

        public static TaskScheduler Instance => _instance ?? (_instance = new TaskScheduler());

        //по часам с добавлением часов и минут
        public void ScheduleTask(int hour, int min, int intervalInHour, Action task)
        {
            DateTime now = DateTime.Now;
            DateTime firstRun = DateTime.Now.AddHours(hour);
            firstRun.AddMinutes(min);

            TimeSpan timeToGo = firstRun - now;
            if (timeToGo <= TimeSpan.Zero)
                timeToGo = TimeSpan.Zero;

            var timer = new Timer(x => { task.Invoke(); }, null, timeToGo, TimeSpan.FromHours(intervalInHour));

            timers.Add(timer);
        }
        //по часам с добавлением часов, минут, секунд и милисекунд
        public void ScheduleTask(int hour, int min, int sec, int milsec, int intervalInHour, Action task)
        {
            DateTime now = DateTime.Now;
            DateTime firstRun = new DateTime(now.Year, now.Month, now.Day, hour, min, sec, milsec);

            TimeSpan timeToGo = firstRun - now;
            if (timeToGo <= TimeSpan.Zero)
                timeToGo = TimeSpan.Zero;

            var timer = new Timer(x => { task.Invoke(); }, null, timeToGo, TimeSpan.FromHours(intervalInHour));

            timers.Add(timer);
        }
        //по секундам с добавлением секунд 
        public void ScheduleTask(int sec, int intervalInSeconds, Action task)
        {
            DateTime now = DateTime.Now;
            DateTime firstRun = new DateTime(now.Year, now.Month, now.Day, now.Hour, now.Minute, sec, 0);

            TimeSpan timeToGo = firstRun - now;
            if (timeToGo <= TimeSpan.Zero)
                timeToGo = TimeSpan.Zero;

            var timer = new Timer(x => { task.Invoke(); }, null, timeToGo, TimeSpan.FromSeconds(intervalInSeconds));

            timers.Add(timer);
        }
    }
}
