import classNames from 'classnames';
import debounce from 'lodash.debounce';
import { useState, useEffect, useCallback } from 'react';
import ReactPlayer from 'react-player';
import { useMovieDetailQuery } from '../hooks/useMovieDetailQuery';
import { useMovieVideoQuery } from '../hooks/useMovieVideoQuery';
import { MovieListItem } from '../models/movieList';
import { Video } from '../models/movieVideos';
import { setDetail, setPreview } from '../slice/appSlice';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import MovieDetailModal from './MovieDetailModal';

interface Props {
  movieItem: MovieListItem;
  //poster_path: string;
  top: number;
  left: number;
}

export default function MoviePreviewModal({ movieItem, top, left }: Props) {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const { isDetailActivated, isPreviewMuted } = useAppSelector(
    (state) => state.app
  );
  const dispatch = useAppDispatch();
  const { data: movieDetail, isLoading: detailLoading } = useMovieDetailQuery(
    movieItem.id,
    true
  );
  const { data: movieVideo, isLoading: videoLoading } = useMovieVideoQuery(
    movieItem.id,
    true
  );

  const movieVideoYT: Video | undefined = movieVideo?.results.find(
    (video) => video.site === 'YouTube'
  );

  const divElement = document.getElementById(`preview-${movieItem.id}`);
  divElement?.addEventListener('webkitTransitionEnd', () => {
    if (divElement.className.includes('scale-100') && !isDetailActivated)
      dispatch(setPreview(false));
  });

  divElement?.addEventListener('transitionEnd', () => {
    if (divElement.className.includes('scale-100') && !isDetailActivated)
      dispatch(setPreview(false));
  });

  useEffect(() => setIsHover(true), []);

  const handleMouseOver = () => {
    setPlaying(true);
  };

  const debouncedHandleMouseOver = useCallback(
    debounce(handleMouseOver, 3000),
    []
  );
  console.log(
    `render preview modal with props => movieItem: ${movieItem}, top: ${top}, left: ${left}`
  );
  return (
    <div
      className={classNames(
        'z-50 absolute',
        isDetailActivated
          ? 'w-full min-h-screen bg-black bg-opacity-60 overflow-auto'
          : ''
      )}
      style={{
        top: isDetailActivated ? `0px` : `${top}px`,
        left: isDetailActivated ? `0px` : `${left}px`,
      }}
      onMouseOver={() => {
        if (!isDetailActivated) debouncedHandleMouseOver();
      }}
      onMouseLeave={() => debouncedHandleMouseOver.cancel()}
    >
      <div
        id={`preview-${movieItem.id}`}
        className={classNames(
          `w-60 transition-all duration-150 ease-in-out z-50 rounded-md min-h-[360px]`,
          isHover && !isDetailActivated ? 'scale-125' : 'scale-100',
          isDetailActivated
            ? 'w-4/6 min-w-[480px] bg-black m-auto mt-10 p-5'
            : ''
        )}
        onMouseOver={() => {
          if (!isHover && !isDetailActivated) setIsHover(true);
        }}
        onMouseLeave={() => {
          if (!isDetailActivated) setIsHover(false);
        }}
        onClick={() => {
          if (!isDetailActivated) dispatch(setDetail(true));
        }}
      >
        {!isDetailActivated ? (
          <>
            <figure>
              <img
                src={`${process.env.REACT_APP_MOVIEIMAGEAPI_URL}w500${movieItem.poster_path}`}
                alt={movieItem.title}
              />
            </figure>
            <div
              className={classNames(
                'absolute inset-x-0 bottom-0 h-[360px] pt-[240px] px-2 transition-all duration-1000 ease-in-out delay-[2000ms] bg-gradient-to-t from-black',
                isHover ? 'bg-black' : 'bg-gradient-to-t from-black'
              )}
            >
              <div
                className={classNames(
                  'transition-all ease-in-out duration-300',
                  isHover
                    ? 'translate-y-0 opacity-1'
                    : 'translate-y-6 opacity-0 '
                )}
              >
                <h1 className={classNames('text-white')}>{movieItem.title}</h1>

                <p className={classNames('text-xs text-white')}>
                  {movieDetail?.tagline}
                </p>
                {movieDetail?.genres.map((genre) => (
                  <div
                    key={genre.id}
                    className={classNames(
                      'badge badge-sm badge-primary ml-1 mb-1 '
                    )}
                  >
                    {genre.name}
                  </div>
                ))}
              </div>
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
            </div>
          </>
        ) : (
          <MovieDetailModal movieItem={movieItem} />
        )}
      </div>
    </div>
  );
}
