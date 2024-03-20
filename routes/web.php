<?php

use App\Http\Controllers\FrontendController;
use App\Http\Controllers\MovieController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



route::get('/movies/all',[MovieController::class,'index'])->name('movie.all');
route::get('/movies/create',[MovieController::class,'create'])->name('movie.create');
route::post('/movies/store',[MovieController::class,'store'])->name('movie.store');


route::get('/{genre?}',[FrontendController::class,'index'])->name('frontend.index');
