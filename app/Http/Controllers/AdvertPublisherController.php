<?php

namespace App\Http\Controllers;

use App\Advertpublisher;
use Illuminate\Http\Request;

class AdvertPublisherController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Advertpublisher::search(request('search'))->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search()
    {
        return response()->json(Advertpublisher::search(request('search'))->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->validate([
            'details' => 'required',
            'tags' => 'required'
        ]);
        $advertpublisher = new Advertpublisher;
        $advertpublisher->details = $input['details'];
        $advertpublisher->save();
        $advertpublisher->tags()->attach($input['tags']);
        return response()->json($advertpublisher);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Advertpublisher  $advertpublisher
     * @return \Illuminate\Http\Response
     */
    public function show(Advertpublisher $advertpublisher)
    {
        return response()->json(Advertpublisher::whereId($advertpublisher->id)->with('tags')->first());
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Advertpublisher  $advertpublisher
     * @return \Illuminate\Http\Response
     */
    public function edit(Advertpublisher $advertpublisher)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Advertpublisher  $advertpublisher
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Advertpublisher $advertpublisher)
    {
        $input = $request->validate([
            'details' => 'required',
            'tags' => 'required'
        ]);
        $advertpublisher->details = $input['details'];
        $advertpublisher->save();
        $advertpublisher->tags()->sync($input['tags']);
        return response()->json();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Advertpublisher  $advertpublisher
     * @return \Illuminate\Http\Response
     */
    public function destroy(Advertpublisher $advertpublisher)
    {
        return response()->json($advertpublisher->delete());
    }
}
