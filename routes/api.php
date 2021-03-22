<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RolController;
use App\Http\Controllers\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('login', 'App\Http\Controllers\Auth\LoginController@login')->name('login');

Route::group(['middleware' => ['cors', 'auth:api']], function() {
    Route::get('/users',  ['middleware' => ['permission:users-read|acl-read'], 'uses' => 'App\Http\Controllers\User\UserController@allUsersAndRoles'])->name('users');
    Route::get('/roles', [RolController::class, 'index'])->name('rol.all');
    Route::post('/user/roles', ['middleware' => ['role:superadministrator|administrator'], 'uses' => 'App\Http\Controllers\User\UserRolController@store'])->name('users.roles');
});
