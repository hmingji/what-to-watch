import debounce from 'lodash.debounce';
import { useState, useEffect, useCallback } from 'react';
import ReactPlayer from 'react-player';
import { useMovieDetailQuery } from '../../hooks/useMovieDetailQuery';
import { useMovieVideoQuery } from '../../hooks/useMovieVideoQuery';
import { MovieListItem } from '../../models/movieList';
import { Video } from '../../models/movieVideos';
import { useAppSelector } from '../../store/configureStore';
import ColorChangeBackground from '../Animation/ColorChangeBackground';
import TranslateOnAppearAnime from '../Animation/TranslateOnAppearAnime';

interface Props {
  movieItem: MovieListItem;
}

export default function MovieModalPreviewContent({ movieItem }: Props) {
  const [playing, setPlaying] = useState(false);
  const { isPreviewMuted } = useAppSelector((state) => state.app);
  const { data: movieDetail } = useMovieDetailQuery(movieItem.id, true);
  const { data: movieVideo, isLoading: videoLoading } = useMovieVideoQuery(
    movieItem.id,
    true
  );
  // todo:make video to be looped in list
  const movieVideoYT: Video | undefined = movieVideo?.results.find(
    (video) => video.site === 'YouTube'
  );

  const handleMouseOver = () => {
    setPlaying(true);
  };

  const debouncedHandleMouseOver = useCallback(
    debounce(handleMouseOver, 3000),
    []
  );

  useEffect(() => {
    debouncedHandleMouseOver();
    return () => debouncedHandleMouseOver.cancel();
  }, []);

  return (
    <>
      {movieItem.poster_path ? (
        <figure>
          <img
            src={`${process.env.REACT_APP_MOVIEIMAGEAPI_URL}w500${movieItem.poster_path}`}
            alt={movieItem.title}
          />
        </figure>
      ) : (
        <div className="bg-slate-700 w-full h-full p-2">
          <p className="text-white text-center my-10">{movieItem.title}</p>
        </div>
      )}

      <ColorChangeBackground className="absolute inset-x-0 bottom-0 h-[360px] pt-[240px] px-2 bg-gradient-to-t from-black delay-[2000ms]">
        <TranslateOnAppearAnime>
          <h1 className="text-white">{movieItem.title}</h1>

          <p className="text-xs text-white">{movieDetail?.tagline}</p>

          {movieDetail?.genres.map((genre) => (
            <div
              key={genre.id}
              className="badge badge-sm badge-primary ml-1 mb-1"
            >
              {genre.name}
            </div>
          ))}
        </TranslateOnAppearAnime>

        {movieVideoYT && !videoLoading && (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${movieVideoYT.key}`}
            width="100%"
            height="240px"
            muted={isPreviewMuted}
            playing={playing}
            style={{
              visibility: playing ? 'visible' : 'hidden',
              position: 'absolute',
              top: '0px',
              left: '0px',
            }}
          />
        )}
      </ColorChangeBackground>
    </>
  );
}
