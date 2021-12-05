const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/av-collection')
    .then(() => console.log('COnnected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

const movieSchema = new mongoose.Schema({
    productNumber: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 32,
    },
    artist: String,
    tags: [String],
    releaseDate: Date
});

const Movie = mongoose.model('Movie', movieSchema);

async function createMovie() {
    const movie = new Movie({
        productNumber: 'SSIS-179',
        artist: '和知すばる',
    });

    const result = await movie.save();
    console.log(result);
}

async function getMovies() {
    const pageNumber = 1;
    const pageSize = 10;

    const movies = await Movie
        .find({ productNumber: 'SSIS-179' })
        .skip((pageNumber - 1) * pageSize)
        .limit(10)
        .sort({ productNumber: 1 })
        .select({ productNumber: 1, artist: 1, tags: 1, });
    console.log(movies);
}

async function updateMovie(id) {
    const movie = await Movie.findById(id);
    if (!movie) return;

    movie.tags = ['Big Tits', 'Lotion'];

    const result = await movie.save();
    console.log(result);
}

async function removeMovie(id) {
    const movie = await Movie.findByIdAndRemove(id);
    console.log(movie);
}

// createMovie();
// getMovies();
// updateMovie('61accc802d6cda33a85b239d');
// removeMovie('61acc316cba0d02bdf8d401c');

