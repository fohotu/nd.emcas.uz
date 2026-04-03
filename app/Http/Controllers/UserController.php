<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Actions\User\CreateUserAction;
use App\Actions\User\DeleteUserAction;
use App\Actions\User\UpdateUserAction;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\User;
use Inertia\Inertia;
use App\Services\UserService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

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


     public function update(User $user,UpdateUserRequest $request, UpdateUserAction $action)
    {
        $user = $action->execute($user,$request->validated());
        return redirect()->back();
        //return response()->json($user,200);
    }
    
    public function update1($id, UpdateUserRequest $request, UserService $service)
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

    public function updatePassword(User $user, Request $request)
    {
        //$2y$12$3ukXSE9EdaKsH/I9jjR59.lMrjCHmclMXi9YNqCx9iYTDZLCy1TxO
        // 1. Валидация с расширенными правилами
        $request->validate([
            'password' => [
                'required', 
                'confirmed', 
                Password::min(8)->letters()->numbers() // Пример: минимум 8 символов, буквы и цифры
            ],
        ]);
        $user->update([
            'password' => Hash::make($request->password),
        ]);

        // 3. Возврат с уведомлением для Inertia/SweetAlert
        return redirect()->back()->with('success', 'Пароль пользователя успешно изменен.');

    }

}
