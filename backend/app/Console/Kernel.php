<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Config;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $timezone = config('scheduler.default_timezone', config('app.timezone', 'UTC'));
        $schedules = config('scheduler.schedules', []);
        
        if (empty($schedules)) {
            $this->error('No scheduled commands found in configuration.');
            return;
        }
        
        // Schedule each command based on configuration
        foreach ($schedules as $command => $config) {
            if (!isset($config['enabled']) || !$config['enabled']) {
                continue;
            }
            
            $scheduleCommand = $schedule->command($command);
            
            // Set the schedule based on frequency
            switch ($config['frequency']) {
                case 'everyMinute':
                    $scheduleCommand->everyMinute();
                    break;
                    
                case 'everyFiveMinutes':
                    $scheduleCommand->everyFiveMinutes();
                    break;
                    
                case 'everyTenMinutes':
                    $scheduleCommand->everyTenMinutes();
                    break;
                    
                case 'everyFifteenMinutes':
                    $scheduleCommand->everyFifteenMinutes();
                    break;
                    
                case 'everyThirtyMinutes':
                    $scheduleCommand->everyThirtyMinutes();
                    break;
                    
                case 'hourly':
                    $scheduleCommand->hourly();
                    break;
                    
                case 'daily':
                    if (isset($config['at'])) {
                        $scheduleCommand->dailyAt($config['at']);
                    } else {
                        $scheduleCommand->daily();
                    }
                    break;
                    
                case 'weekly':
                    if (isset($config['day'], $config['at'])) {
                        $scheduleCommand->weeklyOn($config['day'], $config['at']);
                    } else {
                        $scheduleCommand->weekly();
                    }
                    break;
                    
                case 'monthly':
                    if (isset($config['day'], $config['at'])) {
                        $scheduleCommand->monthlyOn($config['day'], $config['at']);
                    } else {
                        $scheduleCommand->monthly();
                    }
                    break;
                    
                case 'quarterly':
                    $scheduleCommand->quarterly();
                    break;
                    
                case 'yearly':
                    $scheduleCommand->yearly();
                    break;
                    
                case 'cron':
                    if (isset($config['expression'])) {
                        $scheduleCommand->cron($config['expression']);
                    }
                    break;
            }
            
            // Set timezone if specified
            if (isset($config['timezone'])) {
                $scheduleCommand->timezone($config['timezone']);
            }
            
            // Add any additional options
            if (isset($config['options']) && is_array($config['options'])) {
                foreach ($config['options'] as $option => $value) {
                    $scheduleCommand->$option($value);
                }
            }
        }
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');
        require base_path('routes/console.php');
    }
}
