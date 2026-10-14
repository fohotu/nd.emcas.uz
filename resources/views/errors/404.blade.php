<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 — Page not found</title>
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
    <main class="w-full max-w-md text-center">

        <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="h-10 w-10"
                 fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" stroke-width="1.7">
                <circle cx="11" cy="11" r="7"/>
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="m16 16 4 4M8.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5m0 3h.008"/>
            </svg>
        </div>

        <h1 class="text-8xl font-extrabold tracking-tight text-gray-900">
            404
        </h1>

        <h2 class="mt-4 text-xl font-semibold text-gray-800">
            Page not found
        </h2>

        <p class="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
            Sorry, we couldn't find the page you're looking for.
            It may have been moved or deleted.
        </p>

        <div class="mt-8 flex items-center justify-center gap-3">
            <a href="{{ url()->previous() }}"
               class="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg"
                     class="h-4 w-4" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor"
                     stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M10 19l-7-7 7-7M3 12h18"/>
                </svg>
                Go back
            </a>

            <a href="{{ url('/') }}"
               class="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700">
                Home page
            </a>
        </div>

        <p class="mt-12 text-xs text-gray-400">
            Error code: 404 · Not found
        </p>
    </main>
</body>
</html>
