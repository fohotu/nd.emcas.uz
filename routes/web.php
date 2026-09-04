<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Actions\GetServerStatusAction;
use Inertia\Inertia;


Route::get('/test-action', function (GetServerStatusAction $action) {
    // Tree View Menu "React Arborist" instance of "jsTree"
    return Inertia::render('Dashboard',[
        'serverInfo' => $action->execute()
    ]);
});

Route::get('/tree', function () {
    return Inertia::render('Post/TreeView', [
        'serverInfo' => 1,
    ]);
});

/*
Route::get('/documents', [DocumentController::class, 'index'])->name('documents.index');
Route::post('/documents', [DocumentController::class, 'store'])->name('documents.store');
*/


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {

    //user profile routes
    Route::get('/documents/menu/{id}/category/{category_id?}',[DocumentController::class, 'view'])->name('document.view');
    Route::get('/documents/{document}',[DocumentController::class, 'show'])->name('document.show');


    //admin routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    //Ресурсные маршруты для документов и пользователей

    Route::get('/document/live-search', [DocumentController::class, 'liveSearch'])->name('document.live-search');

    Route::resource('documents', DocumentController::class)->only(['index', 'store', 'update', 'destroy','edit']);
    Route::post('/documents/bulk-delete', [DocumentController::class, 'bulkDelete'])->name('documents.bulk-delete');
   


    Route::resource('users', UserController::class)->only(['index', 'store', 'update', 'destroy','edit',]);
    Route::post('/users/{user}/block', [UserController::class, 'block']);
    Route::patch('/users/{user}/password', [UserController::class, 'updatePassword'])
        ->name('users.password.update');
    Route::patch('/users/{user}/role', [UserController::class, 'updateRole'])
        ->name('users.role.update');

    Route::post('/users/bulk-delete', [UserController::class, 'bulkDelete'])->name('users.bulk-delete');

    Route::resource('menu', MenuController::class)->only(['index', 'store', 'update', 'destroy','edit']);
    Route::post('/menu/bulk-delete', [MenuController::class, 'bulkDelete'])->name('menu.bulk-delete');
    Route::get('/menu/live-search', [MenuController::class, 'liveSearch'])->name('menu.live-search');
   
    Route::resource('category', CategoryController::class)->only(['index', 'store', 'update', 'destroy','edit']);
    Route::post('/category/bulk-delete', [CategoryController::class, 'bulkDelete'])->name('category.bulk-delete');
    Route::get('/category/live-search', [CategoryController::class, 'liveSearch'])->name('category.live-search');
    Route::get('/category/by-menu', [CategoryController::class, 'getCategoryByMenu'])->name('category.by-menu');
   
    // Другие защищенные маршруты...

    //Upload File
    Route::post('/file/upload',[FileController::class,'upload']);
    Route::post('/file/remove',[FileController::class,'remove']);
    Route::get('/file/download/{id}',[FileController::class,'download'])->name('file.download')->withoutMiddleware([EnsureAdmin::class]);
    Route::get('/file/download-link/{id}',[FileController::class,'dowloadLink'])->name('file.download-link')->withoutMiddleware([EnsureAdmin::class]);



});


Route::get('/t11', function () {

    function renderNode(array $node, int $level = 0)
    {
        $margin = $level * 30;

        foreach ($node as $key => $value) {

            if (is_array($value)) {

                echo "<div style='margin-left:{$margin}px'>";
                echo "<h4>$key</h4>";

                renderNode($value, $level + 1);

                echo "</div>";
            } else {

                echo "<div style='margin-left:{$margin}px'>";
                echo "<b>$key</b> : $value";
                echo "</div>";
            }
        }
    }

    $parser = new App\Services\NoticeParser();


    $data = $parser->parse(storage_path('app/KGZITU984.txt'));

    
   // renderNode($data);
    
   
   
    $temp = [];
    $index = 0;
    foreach($data['notices'] as $k=>$notice) {

        $key = $notice['fields']['t_freq_assgn']."-".$notice['fields']['t_bdwdth_cde'];
        if(!isset($temp[$key])){
            $index++;
            $temp[$key] = $notice;
             echo "<h3>#{$index} Notice</h3>";
       
            echo  $notice['fields']['t_action']."-".$notice['fields']['t_freq_assgn']." - ".$notice['fields']['t_bdwdth_cde']."</br>";
            echo "<hr>";
        }    

       
       

    }
    echo "<h3>Всего уникальных частот: ".count($temp)."</h3>";
     dd($data);

})->name('t11');


require __DIR__.'/auth.php';
