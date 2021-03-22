<?php

namespace App\Http\Controllers\User;

use http\Env\Response;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function allUsersAndRoles()
    {
        try {
            $allUsers = User::all();
            $data = array();
            foreach ($allUsers as $user) {
                $roles = $user->roles()->get();
                $userRoles = array();
                foreach ($roles as $rol) {
                    array_push($userRoles, $rol->name);
                }
                $dataUser = [
                    "id" => $user->id,
                    "name" => $user->name,
                    "email" => $user->email,
                    "rol" => $userRoles
                ];
                array_push($data, $dataUser);
            }
            return Response()->json([
                'data' => $data,
                'status' => 200
            ]);
        }
        catch (\Exception $e)
        {
            return Response()->json([
                'data' => 'error '.$e,
                'status' => 404
            ]);
        }
    }

}
