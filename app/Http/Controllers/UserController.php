<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(User::search(request('search'))->get());
    }

    public function search()
    {
        return response()->json(\App\User::search(request('search'))->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'password' => 'required|same:confirmed',
        ]);

        if (trim($request->password) == '') {
            $input = $request->except('password');
        } else {
            $input['password'] = bcrypt($request->password);
        }

        $user = new User;
        $user->name = $input['name'];
        $user->email = $input['email'];
        $user->password = $input['password'];
        $user->save();
        if ($request->tags) {
            $user->tags()->attach($request->tags);
        }
        return response()->json($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response()->json(User::whereId($user->id)->with('tags')->first());
    }

    public function advert(User $user)
    {
        $tagId =  User::with('tags')->whereId($user->id)->first()['tags']->pluck('id');
        return \App\advertpublisher_tag::whereIn('tag_id', $tagId)->with('tag', 'advertpublisher')->get();
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $input = $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email,'.$user->id,
            'password' => 'same:confirmed',
        ]);

        if (trim($request->password) == '') {
            $input = $request->except('password');
        } else {
            $input['password'] = bcrypt($request->password);
        }
        $user->update($input);
        if ($request->tags) {
            $user->tags()->sync($request->tags);
        }
        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        return response()->json($user->delete());
    }
}
