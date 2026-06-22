<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Trip;

class UpdateTripStatuses extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-trip-statuses';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description =
        'Automatically mark finished trips as completed';

    /**
     * Execute the console command.
     */
  public function handle(): int
    {
        $updated = Trip::where(
                'status',
                'scheduled'
            )
            ->where(
                'arrival_time',
                '<=',
                now()
            )
            ->update([
                'status' => 'completed'
            ]);

        $this->info(
            "{$updated} trips marked as completed."
        );

        return self::SUCCESS;
    }
}