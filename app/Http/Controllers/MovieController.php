<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File; 

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $movies = Movie::all();
        return view('backend.movies.index',compact('movies'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('backend.movies.create');
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $path = public_path('movies');
        if ( ! file_exists($path) ) {
            mkdir($path, 0777, true);
        }

        DB::transaction(function() use ($request,&$path,$data) {
        $poster_name = '';
        $background_name = '';
        $movie_name = '';

        
        //check if there is an image
        if($request->hasFile('poster_url')){
            $file = $request->file('poster_url');
            $poster_name = 'poster_'.uniqid() . '_' . trim($file->getClientOriginalName());
            $file->move($path, $poster_name);
        }

        if($request->hasFile('background_url')){
            $file2 = $request->file('background_url');
            $background_name = 'background_'.uniqid() . '_' . trim($file2->getClientOriginalName());
            $file2->move($path, $background_name);
        }

        if($request->hasFile('movie_url')){
            $file3 = $request->file('movie_url');
            $movie_name = 'movie_'.uniqid() . '_' . trim($file3->getClientOriginalName());
            $file3->move($path, $movie_name);
        }

        $data['poster_url'] = $poster_name;
        $data['background_url'] = $background_name;
        $data['movie_url'] = $movie_name;

        Movie::create($data);
        });

        
        return redirect()->route('movie.all');
    }

  
    public function show(Movie $movie)
    {
        //
    }

 
    public function edit(Movie $movie)
    {
        //
    }

  
    public function update(Request $request, Movie $movie)
    {
        //
    }

    public function destroy(Movie $movie)
    {
        //
    }
}
