<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class FrontendController extends Controller
{
    public function index($genre = null)
    {
        if ($genre) {
            $movies = Movie::where('genre', $genre)->get();
        } else {
            $movies = Movie::all();
        }
        return view('frontend.index',compact('movies'));
    }
}
