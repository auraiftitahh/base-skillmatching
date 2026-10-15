<!doctype html>
<html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="csrf-token" content="{{ csrf_token() }}"><title>{{ $title ?? 'Skill Matching' }} — Skill Matching</title><link rel="stylesheet" href="{{ asset('css/skill-matching.css') }}"></head>
<body>
@yield('content')
<script>
 document.addEventListener('click',event=>{const button=event.target.closest('[data-confirm]');if(button && !window.confirm(button.getAttribute('data-confirm')))event.preventDefault()});
 document.querySelectorAll('.alert-success').forEach(el=>setTimeout(()=>el.classList.add('faded'),6000));
</script>
<script src="{{ asset('js/data-controls.js') }}" defer></script>
</body></html>
