<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MenuController;
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

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    // Ресурсные маршруты для документов и пользователей

    Route::resource('documents', DocumentController::class)->only(['index', 'store', 'update', 'destroy','edit']);
    Route::resource('users', UserController::class)->only(['index', 'store', 'update', 'destroy','edit',]);
    Route::post('/users/{user}/block', [UserController::class, 'block']);
    Route::patch('/users/{user}/password', [UserController::class, 'updatePassword'])
        ->name('users.password.update');
    Route::patch('/users/{user}/role', [UserController::class, 'updateRole'])
        ->name('users.role.update');
    Route::post('/users/bulk-delete', [UserController::class, 'bulkDelete'])->name('users.bulk-delete');

    Route::resource('menu', MenuController::class)->only(['index', 'store', 'update', 'destroy','edit']);
    Route::post('/menu/bulk-delete', [MenuController::class, 'bulkDelete'])->name('menu.bulk-delete');

    // Другие защищенные маршруты...
});

require __DIR__.'/auth.php';
