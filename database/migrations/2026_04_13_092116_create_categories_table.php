<?php 
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            // связь с меню
            $table->foreignId('menu_id')
                ->nullable()
                ->constrained('menus')
                ->nullOnDelete();
                //->cascadeOnDelete();
            // дерево (parent)
            $table->foreignId('parent_id')
                ->nullable()
                ->constrained('categories')
                ->nullOnDelete();
                // ->cascadeOnDelete();
            // порядок (для drag & drop)
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->dropForeign(['parent_id']);
            $table->dropForeign(['menu_id']);
        });
        Schema::dropIfExists('categories');
    }
};

?>