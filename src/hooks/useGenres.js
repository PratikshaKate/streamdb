const useGenres = (selectedGenres) => {
  if (selectedGenres.length < 1) return "";

  const GenreIds = selectedGenres.map((ele) => ele.id);
  console.log(GenreIds.join(","));
  return GenreIds.reduce(
    (accumulator, currentValue) => accumulator + "," + currentValue
  );
};

export default useGenres;
