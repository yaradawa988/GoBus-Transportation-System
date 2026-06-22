<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable()->after('email');
            $table->string('avatar')->nullable();
            $table->string('google_id')->nullable()->unique();
             $table->enum('role', ['admin','passenger'])->default('passenger');
             $table->boolean('status')->default(true);
            $table->timestamp('last_login_at')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
                $table->dropColumn([
                'phone',
                'avatar',
                'google_id',
                'role',
                'status'
            ]);
        });
    }
};
