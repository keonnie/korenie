import Navigation from './navigation'

// Register events handlers
globalThis.addEventListener('popstate', Navigation.back)
globalThis.addEventListener('DOMContentLoaded', Navigation.title)
