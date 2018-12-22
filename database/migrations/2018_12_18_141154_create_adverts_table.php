<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdvertsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('adverts', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('advertpublisher_id');
            $table->foreign('advertpublisher_id')->references('id')->on('advertpublishers');
            $table->string('details', 100);
            $table->timestamps();
        });
        Schema::create('advertpublisher_tag', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('advertpublisher_id');
            $table->foreign('advertpublisher_id')->references('id')->on('advertpublishers')->onDelete('cascade');
            $table->unsignedInteger('tag_id');
            $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade');
        });
        Schema::create('tag_user', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('tag_id');
            $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade');
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('adverts');
    }
}
