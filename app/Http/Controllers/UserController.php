<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Actions\User\CreateUserAction;
use App\Actions\User\DeleteUserAction;
use App\Http\Requests\User\StoreUserRequest;
use App\Models\User;
use Inertia\Inertia;
use App\Services\UserService;

class UserController extends Controller
{
    public function store(StoreUserRequest $request, CreateUserAction $action)
    {
        $user = $action->execute($request->validated());

        return response()->json($user,201);
    }

    public function index(){
        $users = (new UserService())->getAllUsers();

        return Inertia::render('User/Index', [
            'users' => $users
        ]);
    }

    public function edit($id,UserService $service){
        $user = $service->getUserById($id);

        return response()->json($user,200); 

    }
    
    public function update($id, UpdateUserRequest $request, UserService $service)
    {
        $user = $service->updateUser($id, $request->validated());
        return response()->json($user);
    }

    public function destroy(User $user, DeleteUserAction $action)
    {
       $action->execute($user); 
        return response()->json(null, 204);
    }

 

    public function block(User $user, UserService $service)
    {
        $result = $service->toggleBlockUser($user);

        return response()->json([
            'user_status' => $result
        ]);
    }

}
