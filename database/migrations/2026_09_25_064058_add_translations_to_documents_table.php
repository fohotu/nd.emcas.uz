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
        Schema::table('documents', function (Blueprint $table) {
            $table->string('title_ru')->nullable()->after('title');
            $table->string('title_uz')->nullable()->after('title_ru');
            $table->string('title_en')->nullable()->after('title_uz');

            $table->text('description_ru')->nullable()->after('description');
            $table->text('description_uz')->nullable()->after('description_ru');
            $table->text('description_en')->nullable()->after('description_uz');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('documents', function (Blueprint $table) {
            $table->dropColumn([
                'title_ru',
                'title_uz',
                'title_en',
                'description_ru',
                'description_uz',
                'description_en',
            ]);
        });
    }
};
