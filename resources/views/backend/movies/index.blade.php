@extends('layouts.base')
@section('page-content')
<div class="container-lg">
    <div class="card mb-4">
        <div class="card-header">Movies</div>
        <div class="card-body">
            <div class="col-12">
                <table class="table table-striped">
                    <thead>
                        <th>#</th>
                        <th>Poster</th>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Year</th>
                        <th>Duration</th>
                        <th>Rating</th>
                    </thead>
                    @foreach ($movies as $key => $movie)
                        <tr>
                            <td>{{ $key+1 }}</td>
                            <td><img height="100px" src="{{ asset('movies/') }}/{{ $movie->poster_url }}" alt="{{ $movie->title }}"></td>
                            <td>{{ $movie->title }}</td>
                            <td>{{ $movie->genre }}</td>
                            <td>{{ $movie->year }}</td>
                            <td>{{ $movie->duration }}</td>
                            <td>{{ $movie->rating }}</td>
                        </tr>
                    @endforeach
                  </table>
            </div>
        </div>
    </div>
</div>
@endsection