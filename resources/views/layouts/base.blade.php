<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta name="description" content="CoreUI - Open Source Bootstrap Admin Template">
    <meta name="author" content="Łukasz Holeczek">
    <meta name="keyword" content="Bootstrap,Admin,Template,Open,Source,jQuery,CSS,HTML,RWD,Dashboard">
    <title>{{ env('APP_NAME') }}</title>
    <link rel="apple-touch-icon" sizes="57x57"
        href="{{ asset('assets_backend/assets/favicon/apple-icon-57x57.png') }}">
    <link rel="apple-touch-icon" sizes="60x60"
        href="{{ asset('assets_backend/assets/favicon/apple-icon-60x60.png') }}">
    <link rel="apple-touch-icon" sizes="72x72"
        href="{{ asset('assets_backend/assets/favicon/apple-icon-72x72.png') }}">
    <link rel="apple-touch-icon" sizes="76x76"
        href="{{ asset('assets_backend/assets/favicon/apple-icon-76x76.png') }}">
    <link rel="apple-touch-icon" sizes="114x114"
        href="{{ asset('assets_backend/assets/favicon/apple-icon-114x114.png') }}">
    <link rel="apple-touch-icon" sizes="120x120"
        href="{{ asset('assets_backend/assets/favicon/apple-icon-120x120.png') }}">
    <link rel="apple-touch-icon" sizes="144x144"
        href="{{ asset('assets_backend/assets/favicon/apple-icon-144x144.png') }}">
    <link rel="apple-touch-icon" sizes="152x152"
        href="{{ asset('assets_backend/assets/favicon/apple-icon-152x152.png') }}">
    <link rel="apple-touch-icon" sizes="180x180"
        href="{{ asset('assets_backend/assets/favicon/apple-icon-180x180.png') }}">
    <link rel="icon" type="image/png" sizes="192x192"
        href="{{ asset('assets_backend/assets/favicon/android-icon-192x192.png') }}">
    <link rel="icon" type="image/png" sizes="32x32"
        href="{{ asset('assets_backend/assets/favicon/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="96x96"
        href="{{ asset('assets_backend/assets/favicon/favicon-96x96.png') }}">
    <link rel="icon" type="image/png" sizes="16x16"
        href="{{ asset('assets_backend/assets/favicon/favicon-16x16.png') }}">
    <link rel="manifest" href="{{ asset('assets_backend/assets/favicon/manifest.json') }}">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="{{ asset('assets_backend/assets/favicon/ms-icon-144x144.png') }}">
    <meta name="theme-color" content="#ffffff">
    <!-- Vendors styles-->
    <link rel="stylesheet" href="{{ asset('assets_backend/vendors/simplebar/css/simplebar.css') }}">
    <link rel="stylesheet" href="{{ asset('assets_backend/css/vendors/simplebar.css') }}">
    <!-- Main styles for this application-->
    <link href="{{ asset('assets_backend/css/style.css') }}" rel="stylesheet">
    <!-- We use those styles to show code examples, you should remove them in your application.-->
    <link href="{{ asset('assets_backend/css/examples.css') }}" rel="stylesheet">
</head>

<body>
    <div class="wrapper d-flex flex-column min-vh-100 bg-light">
        <header class="header header-sticky mb-4">
            <div class="container-fluid">
                <ul class="header-nav d-none d-md-flex">
                    <li class="nav-item"><a class="nav-link" href="{{ route('movie.all') }}">All Movies</a></li>
                    <li class="nav-item"><a class="nav-link" href="{{ route('movie.create') }}">Add Movie</a></li>
                </ul>
            </div>
        </header>
        <div class="body flex-grow-1 px-3">
            @yield('page-content')
        </div>
        <footer class="footer">
            <div>© {{ date('Y') }} {{ env('APP_NAME') }}.</div>
        </footer>
    </div>
    <!-- CoreUI and necessary plugins-->
    <script src="{{ asset('assets_backend/vendors/@coreui/coreui/js/coreui.bundle.min.js') }}"></script>
    <script src="{{ asset('assets_backend/vendors/simplebar/js/simplebar.min.js') }}"></script>
    <!-- Plugins and scripts required by this view-->
    <script src="{{ asset('assets_backend/vendors/@coreui/utils/js/coreui-utils.js') }}"></script>
    <script src="{{ asset('assets_backend/js/colors.js') }}"></script>
    <script></script>

</body>

</html>
