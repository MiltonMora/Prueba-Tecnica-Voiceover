<?php

namespace App\Http\Controllers\User;

use http\Env\Response;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\Controller;

class UserRolController extends Controller
{

    public function store(Request $request)
    {
        try{
            $user = User::find($request->userId);
            $userRoles = $user->roles()->get();
            $arrayUserRoles = [];
            foreach ($userRoles as $role) {
                if(!in_array($role->name, $request->roles)){
                    $user->detachRole($role->name);
                }
                else {
                    array_push($arrayUserRoles, $role->name);
                }
            }

            foreach ($request->roles as $rol) {
                if(!in_array($rol, $arrayUserRoles)){
                    $user->attachRole($rol);
                }
            }
            return response()->json([
                'status' => 200
            ]);
        }
        catch (\Exception $e){
            return response()->json([
                'data' => $e,
                'status' => 404
            ]);
        }
    }


}
