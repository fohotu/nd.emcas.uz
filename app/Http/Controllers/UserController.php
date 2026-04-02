<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Actions\User\CreateUserAction;
use App\Http\Requests\User\StoreUserRequest;

class UserController extends Controller
{
    public function store(StoreUserRequest $request, CreateUserAction $action)
    {
        $user = $action->execute($request->validated());

        return response()->json($user,201);
    }

    public function index(){

    }
    public function edit(){

    }
    public function update(){

    }
    public function destroy(){

    }

}
