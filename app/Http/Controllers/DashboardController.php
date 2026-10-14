<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Document;
use App\Models\Menu;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function admin()
    {

        $document = Document::count();
        $category = Category::count();
        $menu = Menu::count();
        $user = User::count();

        $last_documents = Document::latest()->take(5)->get();
        $last_users = User::latest()->take(5)->get();

        $stats = [
            'documents' => Document::count(),
            'categories' => Category::count(),
            'menus' => Menu::count(),
            'users' => User::count(),
            'last_documents' => $last_documents,
            'last_users' => $last_users
        ];

        //dd($stats);    

        return inertia('Dashboard', [
           'stats' => $stats,
        ]);


    }

    public function user()
    {
        return inertia('Home/UserDashboard');
    }


}
