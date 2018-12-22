<?php

namespace App\Http\Controllers;

use App\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Tag::search(request('search'))->get());
    }


    public function search()
    {
        return response()->json(Tag::search(request('search'))->get());
   }
    public function store(Request $request)
    {
        $input = $request->validate([
            'description' => 'required'
        ]);
        $tag = new Tag;
        $tag->description = $input['description'];
        $tag->save();
        return response()->json($tag);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function show(Tag $tag)
    {
        return response()->json($tag);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function edit(Tag $tag)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tag $tag)
    {
        $input = $request->validate([
            'description' => 'required'
        ]);
        $tag->description = $input['description'];
        $tag->save();
        return response()->json($tag);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tag $tag)
    {
        return response()->json($tag->delete());
    }
}
