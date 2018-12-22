<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/tags/search', 'TagController@search');
Route::get('/advertpublishers/search', 'AdvertPublisherController@search');
Route::get('/users/search', 'UserController@search');
Route::get('/users/adverts/{user}', 'UserController@advert');
Route::apiResources([
    'adverts' => 'AdvertController',
    'tags' => 'TagController',
    'advertpublishers' => 'AdvertPublisherController',
    'users' => 'UserController',
    'useradverts' => 'UserAdvertController',
]);