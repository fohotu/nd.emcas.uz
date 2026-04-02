<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Actions\GetServerStatusAction;
use Inertia\Inertia;


Route::get('/test-action', function (GetServerStatusAction $action) {
    // Tree View Menu "React Arborist" instance of "jsTree"
    return Inertia::render('Dashboard', [
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

Route::resource('documents', DocumentController::class)->only(['index', 'store', 'update', 'destroy','edit']);
Route::resource('users', UserController::class)->only(['index', 'store', 'update', 'destroy','edit']);

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
});

require __DIR__.'/auth.php';
