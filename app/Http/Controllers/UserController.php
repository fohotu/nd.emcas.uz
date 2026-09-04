<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Actions\User\CreateUserAction;
use App\Actions\User\DeleteUserAction;
use App\Actions\User\UpdateUserAction;
use App\Actions\User\UpdatePasswordAction;
use App\Actions\User\UpdateRoleAction;
use App\Actions\User\BlockUserAction;
use App\Actions\User\BulkDeleteAction;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Requests\User\UpdatePasswordRequest;
use App\Http\Requests\User\UpdateRoleRequest;
use App\Http\Requests\User\BulkDeleteRequest;
use App\Models\User;
use Inertia\Inertia;
use App\Services\UserService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{

    public function store(StoreUserRequest $request, CreateUserAction $action)
    {
        $action->execute($request->validated());
        return redirect()->route('users.index')
            ->with('success', 'User created successfully');
    }

    public function index(UserService $service, Request $request)
    {    
        $query = $request->only(['name', 'email', 'role']);
        $users = $service->getAllUsers($query);
        return Inertia::render('User/Index', [
            'users' => $users->withQueryString(),
            'query' => $query
        ]);
    }

    /*
    public function edit($id,UserService $service)
    {
        $user = $service->getUserById($id);
        return Inertia::render('User/Edit', [
            'user' => $user
        ]);
    }
    */

    public function update(User $user,UpdateUserRequest $request, UpdateUserAction $action)
    {
        $action->execute($user,$request->validated());
        return redirect()->back()->with('success', 'User updated');
    }

    public function destroy(User $user, DeleteUserAction $action)
    {
        $action->execute($user); 
        return redirect()->back()->with('success', 'User deleted');
    }

    public function block(User $user, BlockUserAction $action)
    {
        $result = $action->execute($user);
        return redirect()->back()->with('user_status', $result);
    }

    public function updatePassword(User $user,UpdatePasswordRequest $request, UpdatePasswordAction $action)
    {
        $action->execute($user,$request->validated());
        return redirect()->back()->with('success', 'Пароль пользователя успешно изменен.');
    }

    public function updateRole(User $user, UpdateRoleRequest $request, UpdateRoleAction $action)
    {
        $action->execute($user, $request->validated());
        return redirect()->back()->with('success', 'Роль пользователя успешно изменена.');
    }

    public function bulkDelete(BulkDeleteRequest $request, BulkDeleteAction $action)
    {
        $action->execute($request->validated());
        return redirect()->back()->with('success', 'Пользователи удалены.');
    }

}
