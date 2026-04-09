<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
/*

public function up(): void
    {
        Schema::create('menu', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('sys_name', 50);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('menu');
    }

*/
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('menu', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('sys_name');
            $table->unsignedInteger('parent_id')->nullable();
            $table->integer('order')->default(0);
            $table->string('route')->nullable();
            $table->string('url')->nullable();
            $table->timestamps();
            /*
            $table->index('parent_id');
            $table->foreign('parent_id')
                ->references('id')
                ->on('menu')
                ->onDelete('cascade');
            */
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu');
    }
};
