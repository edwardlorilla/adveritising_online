<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Advertising Online</title>
        <meta name="csrf-token" content="{{ csrf_token() }}"/>
        <link rel="stylesheet" href="{{mix('/css/app.css')}}">
    </head>
    <body>
    <div id="app"></div>
    <script src='{{'/js/app.js'}}'></script>
    </body>
</html>
