<?php

namespace App\Http\Controllers;

use App\tag_user;
use App\User;
use Illuminate\Http\Request;
class UserAdvertController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        /*\App\Advert::whereHas('advertpublisher', function ($query){
            $query->whereHas('tags');
        })->get();*/
        /*$tags = function ($query) {
            $advert = function ($q) {
                $q->with('tags');
            };
            $query->whereHas('advertpublishers', $advert)->with(['advertpublishers' => $advert]);
        };

        return \App\User::whereHas('tags', $tags)->with(['tags' => $tags])->get();*/

//        return \App\Tag::where('id', [1, 2])->get();
        /*return \App\Tag::whereHas('users', function($query){
            $query->whereId(1);
        })->get();*/
        /*return \App\Advertpublisher::whereHas('tags', function ($query){
            return $query->has('users');
        })->get();*/
       /* $tagId =  \App\User::with('tags')->get()[0]['tags']->pluck('id');
        return DB::table('tag_user')->whereIn('tag_id', $tagId)->get();*/
        /*return response()->json(tag_user::with('advertpublisher', 'tag')->search(request('search'))->get());*/
        return response()->json(tag_user::whereHas('tag', function ($query){
            $query->has('advertpublishers');
        })->with(['tag.advertpublishers', 'user'])->get());
    }

    public function search()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        /*$input = $request->validate([
            'details' => 'required',
            'advert_id' => 'required',
            'tag_id' => 'required',
            'user_id' => 'required',
        ]);
        $tag_user = new tag_user;
        $tag_user->details = $input['details'];
        $tag_user->advert_id = $input['advert_id'];
        $tag_user->tag_id = $input['tag_id'];
        $tag_user->user_id = $input['user_id'];
        $tag_user->save();
        return response()->json($tag_user);*/
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\tag_user $tag_user
     * @return \Illuminate\Http\Response
     */




    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\tag_user $tag_user
     * @return \Illuminate\Http\Response
     */
    public function edit(tag_user $tag_user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\tag_user $tag_user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, tag_user $tag_user)
    {
        $input = $request->validate([
            'details' => 'required',
            'advert_id' => 'required',
            'tag_id' => 'required',
            'user_id' => 'required'
        ]);
        $tag_user->details = $input['details'];
        $tag_user->advert_id = $input['advert_id'];
        $tag_user->tag_id = $input['tag_id'];
        $tag_user->user_id = $input['user_id'];
        $tag_user->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\tag_user $tag_user
     * @return \Illuminate\Http\Response
     */
    public function destroy(tag_user $tag_user)
    {
        return response()->json($tag_user->delete());
    }
}
