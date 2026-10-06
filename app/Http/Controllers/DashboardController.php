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

        $stats = [

            'documents' => Document::count(),
            'categories' => Category::count(),
            'menus' => Menu::count(),
            'users' => User::count(),
            
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
