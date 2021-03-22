<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;

class RolController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $rol = new Role();
            return response()->json([
                'data' => $rol->All(),
                'status' => 200
            ]);
        }catch (\Exception $e) {
            return response()->json([
                'data' => $e,
                'status' => 404
            ]);
        }
    }
}
