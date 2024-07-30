let maxPage;
let page = 1;
let infiniteScroll;

searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value;

})

arrowBtn.addEventListener('click', () => history.back());

trendingBtn.addEventListener('click', () => location.hash = '#trends')

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', infiniteScroll, false);

function navigator() {

    if(infiniteScroll){
        window.removeEventListener('scroll', infiniteScroll, {passive: false});
        infiniteScroll = undefined;
    }
    location.hash.startsWith('#trends')?
        trendsPage():
    location.hash.startsWith('#search=')?
        searchPage():
    location.hash.startsWith('#movie=')?
        movieDetailsPage():
    location.hash.startsWith('#category=')?
        categoriesPage():
        homePage();

    window.scrollTo(0, 0);

    if(infiniteScroll){
        window.addEventListener('scroll', infiniteScroll, {passive: false});
    }
}

function homePage() {
console.log('Home!!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    likedMoviesSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getCategoriesPreview();
    getLikedMovies();
}

function categoriesPage() {
    console.log('Categories!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');

    headerCategoryTitle.innerHTML = categoryName.replace('%20', ' ');

    getMovieByCategory(categoryId);

    infiniteScroll = getPaginatedMoviesByCategory(categoryId);
}

function movieDetailsPage() {
    console.log('Movie!!');

    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white')
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');


    const [_, movieId] =  location.hash.split('=');
    getMovieById(movieId);
}

function searchPage() {
    console.log('Search!!');
    
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, query] =  location.hash.split('=');
    getMovieBySearch(query);
    infiniteScroll = getPaginatedMoviesBySearch(query);
}

function trendsPage() {
    console.log('Trends!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    headerCategoryTitle.innerHTML = 'Tendencias';
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMovies();
    infiniteScroll = getPaginatedTrendingMovies;
}
