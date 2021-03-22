<?php


namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make(['email' => $request->email, 'password'=> $request->password], [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'status' => 404
            ]);
        }
        try {
            $userData = User::where('email', $request->email)->first();
            if (Hash::check($request->password, $userData->password)) {
                return response()->json([
                    'data' => $userData->api_token,
                    'status' => 200
                ]);
            }
            return response()->json([
                'data' => "Error en validacion de datos",
                'status' => 404
            ]);
        }
        catch (\Exception $e) {
            return response()->json([
                'data' => "Error en validacion de datos ".$e,
                'status' => 404
            ]);
        }
    }
}
