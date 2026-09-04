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
        /*
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->timestamps(); // Это создаст created_at и updated_at
        });
        */
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->text('title')->nullable();
            $table->string('number', 50)->nullable();
         // $table->timestamp('reg_date')->nullable();
            
            $table->foreignId('menu_id')
                ->nullable()
                ->constrained('menus')
                ->nullOnDelete();
            $table->foreignId('category_id')
                ->nullable()
                ->constrained('categories')
                ->nullOnDelete();

            $table->foreignId('version_for')
                ->nullable()
                ->constrained('documents')
                ->nullOnDelete();
            $table->string('status', 15)->default('active');//suspended
           //$table->string('type', 32)->default('uz');
         //  $table->timestamp('added')->nullable();
        //   $table->timestamp('system_date')->nullable();
            $table->text('description')->nullable();
          //$table->boolean('let_comment')->default(true);
            $table->string('language', 10)->default('uz');
          //$table->string('doc_date', 15)->nullable();
            $table->timestamp('document_date')->nullable();
            $table->timestamps();

        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
         Schema::table('documents', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropForeign(['menu_id']);
        });
        Schema::dropIfExists('documents');
    }
};
