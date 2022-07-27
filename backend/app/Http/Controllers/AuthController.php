<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            return response()->json(['success', auth()->user()]);
        } else {
            return response()->json('error');
        }
    }

    public function register(Request $request)
    {
        $data = $request->all();
        $check = $this->create($data);
        if ($check) {
            return response()->json('success');
        } else {
            return response()->json('error');
        }
    }

    public function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'remember_token' => Str::random(10),
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json('success');
    }
}
