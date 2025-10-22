// src/utils/translations.js
{/*
    Esse bloco de código é um módulo de traduções para uma aplicação multilíngue (inglês e português) e uma função para acessá-las.
*/}
export const translations = {
  en: {
    // Header
    hi: 'Hi',
    logout: 'Logout',
    settings: 'Settings',
    language: 'Language',
    deleteAccount: 'Delete Account',
    dangerZone: 'Danger Zone',
    dangerZoneWarning: 'Once you delete your account, there is no going back.',
    
    // Navigation
    allMovies: 'All Movies',
    watched: 'Watched',
    toWatch: 'To Watch',
    topRated: 'Top Rated',
    
    // Buttons
    addMovie: 'Add Movie',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save Changes',
    cancel: 'Cancel',
    confirm: 'Confirm',
    
    // Forms
    title: 'Title',
    year: 'Year',
    genre: 'Genre',
    alreadyWatched: 'Already watched',
    rating: 'Rating',
    selectRating: 'Select rating',
    
    // Messages
    noMovies: 'No movies added yet!',
    noWatchedMovies: 'No watched movies yet!',
    noToWatch: 'No movies to watch!',
    noRatedMovies: 'No rated movies yet!',
    movieAdded: 'Movie added successfully!',
    movieUpdated: 'Movie updated successfully!',
    deleteMovieConfirm: 'Are you sure you want to delete this movie?',
    deleteAccountConfirm: 'Are you sure you want to DELETE your account? This action cannot be undone and all your movies will be lost forever!',
    accountDeleted: 'Account deleted successfully',
    
    // Titles
    addNewMovie: 'Add New Movie',
    editMovie: 'Edit Movie',
  },
  pt: {
    // Header
    hi: 'Olá',
    logout: 'Sair',
    settings: 'Definições',
    language: 'Idioma',
    deleteAccount: 'Eliminar Conta',
    dangerZone: 'Zona Perigosa',
    dangerZoneWarning: 'Depois de eliminares a tua conta, não há volta atrás.',
    
    // Navigation
    allMovies: 'Todos os Filmes',
    watched: 'Vistos',
    toWatch: 'Para Ver',
    topRated: 'Melhores',
    
    // Buttons
    addMovie: 'Adicionar Filme',
    edit: 'Editar',
    delete: 'Eliminar',
    save: 'Guardar Alterações',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    
    // Forms
    title: 'Título',
    year: 'Ano',
    genre: 'Género',
    alreadyWatched: 'Visto',
    rating: 'Avaliação',
    selectRating: 'Selecionar avaliação',
    
    // Messages
    noMovies: 'Ainda não adicionaste filmes!',
    noWatchedMovies: 'Ainda não viste nenhum filme!',
    noToWatch: 'Não tens filmes para ver!',
    noRatedMovies: 'Ainda não avaliaste filmes!',
    movieAdded: 'Filme adicionado com sucesso!',
    movieUpdated: 'Filme atualizado com sucesso!',
    deleteMovieConfirm: 'Tens a certeza que queres eliminar este filme?',
    deleteAccountConfirm: 'Tens a certeza que queres ELIMINAR a tua conta? Esta ação não pode ser desfeita e todos os teus filmes serão perdidos para sempre!',
    accountDeleted: 'Conta eliminada com sucesso',
    
    // Titles
    addNewMovie: 'Adicionar Novo Filme',
    editMovie: 'Editar Filme',
  }
};

export function useTranslation(lang = 'en') {
  return translations[lang] || translations.en;
}