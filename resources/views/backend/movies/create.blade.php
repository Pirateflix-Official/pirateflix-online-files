@extends('layouts.base')
@section('page-content')
<div class="container-lg">
    <div class="card mb-4">
        <div class="card-header"> Add Movie</div>
        <div class="card-body">
            <form action="{{ route('movie.store') }}" method="post" enctype="multipart/form-data">
                @csrf
                <div class="row">
                    <div class="mb-3 col-12">
                        <label for="exampleFormControlInput1" class="form-label">Title</label>
                        <input type="text" name="title" class="form-control" required>
                    </div>
                    <div class="mb-3 col-3">
                        <label for="exampleFormControlInput1" class="form-label">Genre</label>
                        <select name="genre" class="form-control">
                            @foreach (genre() as $genre)
                                <option>{{ $genre }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="mb-3 col-3">
                        <label for="exampleFormControlInput1" class="form-label">Release Year</label>
                        <input type="number" name="year" class="form-control">
                    </div>
                    <div class="mb-3 col-3">
                        <label for="exampleFormControlInput1" class="form-label">Duration</label>
                        <input type="number" name="duration" class="form-control">
                    </div>
                    <div class="mb-3 col-3">
                        <label for="exampleFormControlInput1" class="form-label">Rating</label>
                        <input type="number" name="rating" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                        <textarea class="form-control" name="description" rows="3"></textarea>
                    </div>
                    <div class="mb-3 col-4">
                        <label for="exampleFormControlInput1" class="form-label">Movie Poster</label>
                        <input type="file" class="form-control" name="poster_url" required>
                    </div>
                    <div class="mb-3 col-4">
                        <label for="exampleFormControlInput1" class="form-label">Background Image</label>
                        <input type="file" class="form-control" name="background_url">
                    </div>
                    <div class="mb-3 col-4">
                        <label for="exampleFormControlInput1" class="form-label">Movie File</label>
                        <input type="file" class="form-control" name="movie_url" >
                    </div>
                    <div class="mt-5 col-12">
                        <button type="submit" class="form-control btn btn-primary">Upload</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection